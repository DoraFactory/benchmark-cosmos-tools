import {
  getSignerClient,
  generateAccount,
  getSignerClientByWallet,
} from "./config";
import {
  GasPrice,
  calculateFee,
  MsgSendEncodeObject,
  SignerData,
} from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet, OfflineSigner } from "@cosmjs/proto-signing";
import { HdPath, stringToPath } from "@cosmjs/crypto";
import { coins, makeCosmoshubPath } from "@cosmjs/amino";
import { AuthInfo, TxBody, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

export async function batchSend(recipients: string[]) {
  let client = await getSignerClient();

  let signerAddr = "dora1t58t7azqzq26406uwehgnfekal5kzym3m9lz4k";

  let msgs: MsgSendEncodeObject[] = [];

  // const recipient = "dora12xkk5rrk6ex2j0yt6kelsqs6yg4nghax7fq924";
  const amount = coins("20000000000000000000", "peaka");
  for (let i = 0; i < recipients.length; i++) {
    const sendMsg: MsgSendEncodeObject = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: signerAddr,
        toAddress: recipients[i],
        amount: amount,
      },
    };

    msgs.push(sendMsg);
  }

  const gasPrice = GasPrice.fromString("100000000000peaka");
  const fee = calculateFee(50000 * msgs.length, gasPrice);
  const result = await client.signAndBroadcast(signerAddr, msgs, fee);
  console.log(result.transactionHash);
}

export async function multiBatchSend(
  signer: DirectSecp256k1HdWallet[],
  packageSize: number
) {
  // const recipient = "dora12xkk5rrk6ex2j0yt6kelsqs6yg4nghax7fq924";
  const amount = coins("1", "peaka");
  for (let i = 0; i < signer.length; i++) {
    let client = await getSignerClientByWallet(signer[i]);

    let [{ address }] = await signer[i].getAccounts();

    let msgs: MsgSendEncodeObject[] = [];
    for (let i = 0; i < packageSize; i++) {
      const sendMsg: MsgSendEncodeObject = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
          fromAddress: address,
          toAddress: address,
          amount: amount,
        },
      };

      msgs.push(sendMsg);
    }

    console.log(i, address);

    const gasPrice = GasPrice.fromString("100000000000peaka");
    const fee = calculateFee(100000 * packageSize, gasPrice);
    try {
      client.signAndBroadcast(address, msgs, fee);
    } catch {
      console.log(`error: ${i}`);
    }
  }
}

export async function benchmarkTest(thread: number, packageSize: number) {
  // let thread = 10000;
  let accountAddresslist: string[] = [];
  let signerList: DirectSecp256k1HdWallet[] = [];
  for (let i = 1; i <= thread; i++) {
    let signer = await generateAccount(i);
    let accountDetail = await signer.getAccounts();
    accountAddresslist.push(accountDetail[0].address);
    signerList.push(signer);
  }
  console.log(accountAddresslist);

  await batchSend(accountAddresslist);

  multiBatchSend(signerList, packageSize);
}

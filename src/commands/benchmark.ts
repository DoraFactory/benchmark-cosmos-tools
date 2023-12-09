import * as fs from "fs";

import type { CommandModule } from "yargs";

import { benchmarkTest } from "../utils";

type Options = {
  repeat?: number;
  thread?: number;
  size?: number;
  faucet?: boolean;
};

const commandModule: CommandModule<Options, Options> = {
  command: "benchmark",

  describe: "Benchmark cosmos tools",

  builder(yargs) {
    return yargs.options({
      repeat: {
        type: "number",
        default: 100,
        desc: "Number of repetitions",
      },
      thread: {
        type: "number",
        default: 100,
        desc: "Number of accounts used for testing",
      },
      size: {
        type: "number",
        default: 1000,
        desc: "Quantity included in each transaction",
      },
      faucet: {
        type: "bool",
        default: false,
        desc: "Faucet test account",
      },
    });
  },

  async handler({ repeat, thread, size, faucet }) {
    let totalTxs = repeat * thread * size;
    console.log(`Total Txs: ${totalTxs}`);
    for (let i = 0; i < repeat; i++) {
      await benchmarkTest(thread, size, faucet);
    }
  },
};

export default commandModule;

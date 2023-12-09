import * as fs from "fs";

import type { CommandModule } from "yargs";

import { benchmarkTest } from "../utils";

type Options = {
  repeat?: number;
  start?: number;
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
      start: {
        type: "number",
        default: 1,
        desc: "Start account index",
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
        type: "boolean",
        default: false,
        desc: "Faucet test account",
      },
    });
  },

  async handler({ repeat, start, thread, size, faucet }) {
    let totalTxs = repeat * thread * size;
    console.log(`Total Txs: ${totalTxs}`);
    for (let i = 0; i < repeat; i++) {
      await benchmarkTest(start, thread, size, faucet);
    }
  },
};

export default commandModule;

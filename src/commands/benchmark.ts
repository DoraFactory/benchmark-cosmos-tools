import * as fs from "fs";

import type { CommandModule } from "yargs";

import { benchmarkTest } from "../utils";

type Options = {
  repeat: number;
  thread: number;
  size: number;
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
    });
  },

  async handler({ repeat, thread, size }) {
    let totalTxs = repeat * thread * size;
    console.log(`Total Txs: ${totalTxs}`);
    for (let i = 0; i < repeat; i++) {
      await benchmarkTest(thread, size);
    }
    process.exit(0);
  },
};

export default commandModule;

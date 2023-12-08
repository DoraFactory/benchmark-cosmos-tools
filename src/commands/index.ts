import { CommandModule } from "yargs";

import benchmark from "./benchmark";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Each command has different options
export const commands: CommandModule<any, any>[] = [benchmark];

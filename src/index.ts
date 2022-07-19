import { createInterface } from "readline";
import { stdin, stdout } from "process";

import Program from "./program";

const readline = createInterface({
  input: stdin,
  output: stdout,
  prompt: ">>> ",
  terminal: false,
});

const program = new Program();

readline.on("line", (input) => {
  program.execute(input);
});

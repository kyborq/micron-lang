import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Program from "./core/program";

type TEditor = {
  code: string;
};

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/compile", (req, res) => {
  const editor: TEditor = req.body;

  const program = new Program(editor.code);
  const output = program.execute();

  res.send(output);
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

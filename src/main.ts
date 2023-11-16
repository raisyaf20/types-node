import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = 8000;

app.use("/", (req: Request, res: Response) => {
  res.status(200).send({ data: "FAIYASHA" });
});

app.listen(port, () => console.info(`listen in port http://localhost:${port}`));

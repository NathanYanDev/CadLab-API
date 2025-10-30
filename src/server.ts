import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from TypeScript + Express!");
});

app.listen(3000, () => {
  console.log("API Server rodando");
});

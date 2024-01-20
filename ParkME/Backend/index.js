import express from "express";
const app = express();
const port = 3000;

app.get("/", (_, res) => {
  // Your code here
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

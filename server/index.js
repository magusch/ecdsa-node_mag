const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "4f739d9e822585b77a9ab8f5b7177d03b3a2d77e919afafd687965e027a6d83e": 100, // first 
  "2e6bcf066dacf6c41c5b087d710970bd52a63e3cb3d1da25de1fe301c3306929": 50, // second
  "d467535058f3c3b6e47a316b7ab68f44e281cd3d29405780fe6df31f190f97d4": 75, // third
  // "03c222795cb9a3610fb3a9e14c1e15d1a99f3944cefafba589be1bece2c1116457": 175, // 4th
  // "035a3ee77f8a30e4cfa2a927807b6b22afa9efd0c2d5b1225a34af84788acc9214": 171, // 5th
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);
  if (amount<0) {
    res.status(400).send({ message: "You cannot send negative ammount!" });
  }
  else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

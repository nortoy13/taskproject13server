const express = require("express");
const collection = require("./mongo");
const OrdersModel = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await collection.findOne({ email: email, password: password });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json("notexist");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (error) {
    res.json("notexist");
  }
});

app.post("/home", async (req, res) => {
  await OrdersModel.create(req.body)
    .then((orders) => res.json(orders))
    .catch((err) => res.json(err));
});

app.get("/orders", async (req, res) => {
  await OrdersModel.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.json(err));
});

app.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  OrdersModel.findById({ _id: id })
    .then((orders) => res.json(orders))
    .catch((err) => res.json(err));
});

app.put("/updateOrder/:id", async (req, res) => {
  const { id } = req.params;
  await OrdersModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      id: req.body.id,
      pnumber: req.body.pnumber,
      user: req.body.user,
      nofOrder: req.body.nofOrder,
    }
  )
    .then((orders) => res.json(orders))
    .catch((err) => res.json(err));
});

app.delete("/deleteData/:id", async (req, res) => {
  const { id } = req.params;
  await OrdersModel.findByIdAndDelete({ _id: id })
    .then((orders) => res.json(orders))
    .catch((err) => res.json(err));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("port connected");
});

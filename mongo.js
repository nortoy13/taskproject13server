const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://nortoy13:nortoy13@cluster1.jmktdxc.mongodb.net/taskproject")
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch(() => {
    console.log("Failed to connect to Mongo");
  });

const newSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const collection = mongoose.model("Collection", newSchema);
module.exports = collection;

const OrdersSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    nofOrder: String,
    user: String,
    pnumber: String,
  },
  { timestamps: true }
);

const OrdersModel = mongoose.model("Orders", OrdersSchema);
module.exports = OrdersModel;

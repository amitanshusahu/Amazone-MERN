import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: {
    type: String,
    require: true,
  },
  seller: {
    type: String,
    require: true,
  },
  pid: {
    type: String,
    require: true,
  }
})

const orderModel = mongoose.model("Orders", orderSchema);

export default orderModel;
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  pid: {
    type: String,
    require: true,
  }
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
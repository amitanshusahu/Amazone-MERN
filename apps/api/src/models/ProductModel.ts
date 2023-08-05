import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  options: {
    type: [String],
    require: true,
  },
  info: {
    type: String,
    require: true, 
  },
  img1: {
      type: String,
      require: true,
  },
  img2: {
      type: String,
      require: true,
  },
  img3: {
      type: String,
      require: true,
  },
  img4: {
      type: String,
      require: true,
  }

});

const productModel = mongoose.model('Products', productSchema);

export default productModel;
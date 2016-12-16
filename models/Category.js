const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: { type: String },
  products: [{ _id: Number, title: String, buy_price: Number, sell_price: Number }]
});

mongoose.model('Category', categorySchema);

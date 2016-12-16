const mongoose = require('mongoose');
const config = require('../config.json');
require('../models/Category');

const Category = mongoose.model('Category');

exports.setUpConnection = function() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
  const mdb = mongoose.connection;
  mdb.on('error', console.error.bind(console, 'MongoDB connection ERROR: '));
  mdb.once('open', console.error.bind(console, `MongoDB connection established! - mongodb://${config.db.host}:${config.db.port}/${config.db.name}`));
}


// Categories Handlers

exports.listCategories = function () {
  return Category.find({}, { 'title': 1 });
}

exports.createCategory = function(data) {
  const category = new Category({
    title: data.title,
    products: []
  });

  return category.save();
}

exports.deleteCategory = function(id) {
  // TODO Just Do It
  return Category.find();
}


// Products Handlers

exports.listProducts = function(id) {
  return Category.find({'title': 'Category 1'}, { 'products': 1, '_id': 0 });
}

exports.deleteProduct = function(id) {
  return Category.update({}, {'$pull': { 'products': { '_id': id } } });
}

exports.createProduct = function(id, data) {
  return Category.update(
    {'_id': id },
    {
      '$push': {
        'products': {
          '_id': 666, // TODO add incremental id handler
          'title': data.title,
          'buy_price': data.buy_price,
          'sell_price': data.sell_price
        }
      }
  });
}

exports.updateProduct = function(id, data) {
  // TODO add category change
  return Category.update(
    {'_id': id },
    {
      '$set': {
        'products': {
          '_id': 666,
          'title': data.title,
          'buy_price': data.buy_price,
          'sell_price': data.sell_price
        }
      }
  });
}

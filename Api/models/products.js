const mongoose = require('mongoose');

const productsScheme = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
    },
    description:{
      type:String,
    },
    price: {
        type: String,
    },
    img:{
      type:String,
    },
    quantity : {
        type: String,
    },

});
const Product = new mongoose.model("Product", productsScheme);

module.exports = Product;
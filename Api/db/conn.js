const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ecommerce-store",
{
useNewUrlParser: true , 
useUnifiedTopology: true,
})
.then( () => {
    console.log("connction is established");
})
.catch( (err) => {
  console.log(err);
});
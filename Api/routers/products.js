import express from "express";
const router = new express.Router();
import Product from "../models/products";
import GetInventory from'../controllers/get-inventory';

router.get("/products", async (req, res) => {
  try {
    const productData = await Product.find({});
    res.send(productData);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await Product.find({id},{description:1, _id:0});
    res.send(productData);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post('/addproducts', async (req, res) => {
  try {
    let ProductData;
    let result;
    for (let index = 11; index < 62; index++) {
         ProductData = await new Product({id:index, name:'Redmi 9C', description:'blue in color', price:'3600', img:'https://images-na.ssl-images-amazon.com/images/I/71A9Vo1BatL._SL1500_.jpg', quantity:'1'})
        result= ProductData.save();
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

router.get('/inventory', async (req, res) => {
  const {
    filters, limit, skip
  } = req.query;
  try {
    const productFilters = filters ? JSON.parse(filters) : [];
    const products = await GetInventory(productFilters, Number(limit), Number(skip));
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.patch('/inventory/:id', async(req, res) => {
  const {id} = req.params;
  const {value} = req.body;
  console.log(id, value);
  try {
    const updatedProduct = await Product.findOneAndUpdate({ id }, {description:value},{ new: true });
    res.status(200).send(updatedProduct);
} catch (error) {
    res.status(400).send(error)
}
})

export default router;

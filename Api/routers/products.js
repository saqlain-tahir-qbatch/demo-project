const express = require('express');
const router = new express.Router();
const Product = require('../models/products')



router.get('/products', async (req, res) => {
    try {
        const productData = await Product.find({});
        res.send(productData);
        
    } catch (error) {
        res.send(error);
        
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const entry = req.params.id;
        const productData = await Product.find({id:entry},{_id:0});
        if (!productData) {
            return res.status(404).send();
            
        } else {
            res.send(productData);
            
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router;
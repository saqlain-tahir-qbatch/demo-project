import Product from "../models/products";
import { extend } from 'lodash';

const GetInventory = async (filters, limit, skip) => {
    let selector = {};
    let i = 0;
    while (i < filters.length) {
      const filter = filters[i];
      const { field, value } = filter;
      switch (field) {
        case 'keyword':
            extend(selector, {
              $or: [
                { name: { $regex: `.*${value}.*`, $options: 'i' } },
                { id: { $regex: `.*${value}.*`, $options: 'i' } },
              ]
            });
         break;
        
         default:
          break;
      }
  
      i += 1;
    }
    const total = await Product.find(selector).countDocuments();
    const products = await Product.find(selector).skip(skip).limit(limit)
    return {products, total};
  };
  export default GetInventory;
  

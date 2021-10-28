import Product from "../models/products";
import { extend } from 'lodash';
import { Console } from "console";

const GetInventory = async (filters) => {
    let selector = {};
    let limit = 0;
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
        case 'rowsPerPage':
             limit = value;
        default:
          break;
      }
  
      i += 1;
    }
    
    const products = await Product.find(selector).limit(limit)
    return products;
  };
  export default GetInventory;
  

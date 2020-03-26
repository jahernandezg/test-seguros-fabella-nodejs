import { Sale } from "./sale.interface";
import { Product } from "../products/product.interface";
import moment from "moment";

export const sales: Sale[] = [
  {
    "id": 1585176820238,
    "products": [
      {
        "id": 4,
        "name": "Mega cobertura",
        "sellIn": 15,
        "price": 80,
        "rules": [
          "DISMINUIR_SELLIN"
        ]
      }
    ],
    "createdAt": moment('2020-03-25T22:53:40.238Z').toDate()
  }
]

export const findAll = async (): Promise<Sale[]> => {
    return sales;
  };
  
  export const find = async (id: number): Promise<Sale> => {
    const record = sales.find(sale => sale.id === id);
  
    if (record !== undefined) {
      return record;
    }
  
    throw new Error("No record found");
  };

  export const create = async (newSale: Sale): Promise<Sale> => {
    newSale.id = new Date().valueOf();
    newSale.createdAt = new Date();
    if(newSale.products.length > 0) {
        sales.push(newSale);
        return newSale;
    } else {
        throw new Error("The sale must contain products");
    }
  };


  export const soldProducts = async (): Promise<Product[]> => {
    const productsSold = flattenArrays(sales.map(sale => sale.products));  
    return productsSold;
  };


  const flattenArrays =  (arr: any[]): any[] => {
    return arr.reduce( (flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flattenArrays(toFlatten) : toFlatten);
      }, []);
  };
import { Sale } from "./sale.interface";
import { Product } from "../products/product.interface";

const sales: Sale[] = []

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

  export const create = async (newSale: Sale): Promise<void> => {
    newSale.id = new Date().valueOf();
    newSale.createdAt = new Date();
    if(newSale.products.length > 0) {
        sales.push(newSale);
        return;
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
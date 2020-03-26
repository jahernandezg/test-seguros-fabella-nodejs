/**
 * Data Model Interfaces
 */

import { Product } from './product.interface';
import { Products } from './products.interface';


/**
 * In-Memory Store
 */

export const  products: Products = {
    1: {
        id: 1,
        name: "Conbertura",
        sellIn: 15,
        price: 20,
        rules: ['DISMINUIR_SELLIN', 'DISMINUIR_PRICE']
    },
    2: {
        id: 2,
        name: "Full cobertura",
        sellIn: 15,
        price: 80,
        rules: ['DISMINUIR_SELLIN','AUMENTAR_PRICE']
    },
    3: {
        id: 3,
        name: "Baja cobertura",
        sellIn: 15,
        price: 20,
        rules: ['DISMINUIR_SELLIN', 'DISMINUIR_PRICE']
    }, 
    4: {
        id: 4,
        name: "Mega cobertura",
        sellIn: 15,
        price: 80,
        rules: ['DISMINUIR_SELLIN']
    },
    5: {
        id: 5,
        name: "Full cobertura super duper",
        sellIn: 15,
        price: 20,
        rules: ['DISMINUIR_SELLIN','AUMENTAR_PRICE_SUPER_DUPER']
    },
    6: {
        id: 6,
        name: "Super avance",
        sellIn: 15,
        price: 20,
        rules: ['DISMINUIR_SELLIN','DISMINUIR_PRICE_X2']
    }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Products> => {
    return products;
  };
  
  export const find = async (id: number): Promise<Product> => {
    const record: Product = products[id];
  
    if (record) {
      return record;
    }
  
    throw new Error("No record found");
  };

  export const create = async (newProduct: Product): Promise<Product> => {
    const id = new Date().valueOf();
    newProduct.id = id;
    newProduct.price = parseInt(newProduct.price.toString(), 10);
    newProduct.sellIn = parseInt(newProduct.sellIn.toString(), 10);
    products[id] = {
      ...newProduct,
      id
    };
    return newProduct
  };

  export const update = async (updatedProduct: Product): Promise<Product> => {
    if (products[updatedProduct.id]) {
      products[updatedProduct.id] = updatedProduct;
      return updatedProduct;
    }
  
    throw new Error("No record found to update");
  };

  export const remove = async (id: number): Promise<string> => {
    const record: Product = products[id];
  
    if (record) {
      delete products[id];
      return 'OK';
    }
  
    throw new Error("No record found to delete");
  };

  export const evaluateProducts = async (days: number): Promise<any[]> => {

    if(days <1)  throw new Error("Days parameter must be greater than 0");

    const evaluateProductsArray = [];
    const tmpPRoducts = JSON.parse(JSON.stringify(products));
    for (let i = 0; i < days; i++) {
      const arrProducts: Product[] = [];

      // console.log(`-------- day ${i} --------`);
      // console.log(' nombre, sellIn, price');

      const productsId = Object.keys(products);
      for (let j = 0; j < productsId.length; j++) {
        const id = parseInt(productsId[j]);
        tmpPRoducts[id] = await applyRules(tmpPRoducts[id]);
        const tmpProduct = JSON.parse(JSON.stringify(tmpPRoducts[id]));
       arrProducts.push(tmpProduct);
       
       // console.log(`${tmpProduct.name}, ${tmpProduct.sellIn}, ${tmpProduct.price}`);

      };
      evaluateProductsArray.push({
        day: i,
        arrProducts: arrProducts
      });      
    }

    return evaluateProductsArray; 
   
  };

  export const applyRules = async (productApplyRules: Product): Promise<Product> => {
    const productApplyRulesClone: Product = JSON.parse(JSON.stringify(productApplyRules));

      productApplyRulesClone.rules.forEach(rule => {
        
        switch (rule) {
          case 'DISMINUIR_SELLIN':
            productApplyRulesClone.sellIn--;
            break;

          case 'DISMINUIR_PRICE':            
            const factor1 = productApplyRulesClone.sellIn <= 0 ? 2 : 1;
            productApplyRulesClone.price -= factor1;
            break;

          case 'AUMENTAR_PRICE':
            productApplyRulesClone.price++;
            break;

          case 'AUMENTAR_PRICE_SUPER_DUPER':

            let priceIncrement = 1;

            if (productApplyRulesClone.sellIn <= 10) priceIncrement = 2;
            if (productApplyRulesClone.sellIn <= 5) priceIncrement = 3;
            productApplyRulesClone.price += priceIncrement;
            if (productApplyRulesClone.sellIn <= 0) productApplyRulesClone.price = 0;
            break;

          case 'DISMINUIR_PRICE_X2':
            const factor2 = productApplyRulesClone.sellIn <= 0 ? 4 : 2;
            productApplyRulesClone.price -= factor2;
            break;
        }

      });

     
      productApplyRulesClone.price = productApplyRulesClone.price <= 0 ? 0 : productApplyRulesClone.price;
      productApplyRulesClone.price = productApplyRulesClone.price > 100 ? 100 : productApplyRulesClone.price;


    return productApplyRulesClone;
  
    // throw new Error("No record found to delete");
  };
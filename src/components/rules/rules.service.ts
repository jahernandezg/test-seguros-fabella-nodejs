/**
 * Data Model Interfaces
 */

import { Rule } from './rule.interface';
import { Rules } from './rules.interface';


/**
 * In-Memory Store
 */

export const rules: Rules = {
    DISMINUIR_SELLIN: {
        key: 'DISMINUIR_SELLIN',
        name: 'Disminuir SellIn',
        desc: 'Al final del dia, el sistema debe disminuir los valores de price y sellIn para cada producto.',
    },
    DISMINUIR_PRICE: {
        key: 'DISMINUIR_PRICE',
        name: 'Disminuir Price',
        desc: 'Al final del dia, el sistema debe disminuir los valores de price y sellIn para cada producto.',
    },
    AUMENTAR_PRICE: {
        key: 'AUMENTAR_PRICE',
        name: 'Aumentar Price',
        desc: 'Regla para productos que incrementan sus precio en vez de disminuirlo.',
    }, 
    AUMENTAR_PRICE_SUPER_DUPER: {
        key: 'AUMENTAR_PRICE_SUPER_DUPER',
        name: 'Aumentar Price super duper',
        desc: 'Regla para productos que incrementan sus precio en vez de disminuirlo bajo ciertas condiciones del parametro sellIn',
    },
    DISMINUIR_PRICE_X2: {
        key: 'DISMINUIR_PRICE_X2',
        name: 'Disminuir Price x2',
        desc: 'Al final del dia, el sistema debe disminuir los valores de price por 2 con esta regla',
    }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Rules> => {
    return rules;
  };
  
  export const find = async (key: string): Promise<Rule> => {
    const record: Rule = rules[key];
  
    if (record) {
      return record;
    }
  
    throw new Error("No record found");
  };
import { Product } from "../products/product.interface";

export interface Sale {
    id: number;
    createdAt: Date;
    products: Product[]
  }
import express, { Request, Response } from "express";

import * as SaletService from "./sales.service";
import { Sale } from "./sale.interface";
import { Product } from "../products/product.interface";

import { body, check, validationResult } from 'express-validator';


export const salesRouter = express.Router();


// GET sold-products/
  
salesRouter.get("/sold-products", async (req: Request, res: Response) => {
  
    try {
      const productsSold: Product[] = await SaletService.soldProducts();
  
      res.status(200).send(productsSold);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });


// GET products/

salesRouter.get("/", async (req: Request, res: Response) => {
    try {
      const products: Sale[] = await SaletService.findAll();
  
      res.status(200).send(products);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });
  
  // GET products/:id
  
  salesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const item: Sale = await SaletService.find(id);
  
      res.status(200).send(item);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });
  
  
  // POST products/
  
  salesRouter.post("/", 
  [
    check('products').notEmpty().withMessage('invalid fields parameters for sale'),
    check('products.*.id').exists().withMessage('invalid product, missing id'),
    check('products.*.name').exists().withMessage('invalid product, missing name'),
    check('products.*.sellIn').exists().withMessage('invalid product, missing sellIn'),
    check('products.*.price').exists().withMessage('invalid product, missing price'),
    check('products.*.rules').exists().withMessage('invalid product, missing rules') 
  ],
  async (req: Request, res: Response) => {
      console.log(req.body);
      const errors = validationResult(req);

      
      if (errors.isEmpty()) {
        try {
            const sale: Sale = req.body;
        
            await SaletService.create(sale);
        
            res.sendStatus(201);
          } catch (e) {
            res.status(404).send(e.message);
          }
    } else {
        // console.log(errors);
        return res.status(422).json({ errors: errors.array() });
    }
   
  });


   
  
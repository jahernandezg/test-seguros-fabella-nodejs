/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ProductService from "./products.service";
import { Product } from "./product.interface";
import { Products } from "./products.interface";
import { check, body, validationResult } from 'express-validator';


/**
 * Router Definition
 */

export const productsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET products/

productsRouter.get("/", async (req: Request, res: Response) => {
    try {
      const products: Products = await ProductService.findAll();
  
      res.status(200).send(products);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });
  
  // GET products/:id
  
  productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const item: Product = await ProductService.find(id);
  
      res.status(200).send(item);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });
  
  
  // POST products/
  
  productsRouter.post("/", 
  [
    check('name').exists().notEmpty().withMessage('name is required'),
    check('sellIn').exists().notEmpty().withMessage('sellIn is required'),
    body('sellIn').isInt().withMessage('sellIn must be number'),
    check('price').isInt({ min: 1, max: 100 }).withMessage('price must be number between 1 to 100'),
    check('rules').exists().notEmpty().withMessage('rules is required'),
  ],
  async (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const product: Product = req.body;
           
            await ProductService.create(product);
        
            res.sendStatus(201);
          } catch (e) {
            res.status(404).send(e.message);
          }
    } else {
        // console.log(errors);
        return res.status(422).json({ errors: errors.array() });
    }

   
  });
  
  // PUT products/
  
  productsRouter.put("/", 
  [
    check('id').exists().notEmpty().withMessage('id is required'),
    check('id').isInt().withMessage('id must be number'),
    check('name').exists().notEmpty().withMessage('name is required'),
    check('sellIn').exists().notEmpty().withMessage('sellIn is required'),
    body('sellIn').isInt().withMessage('sellIn must be number'),
    check('price').isInt({ min: 1, max: 100 }).withMessage('price must be number between 1 to 100'),
    check('rules').exists().notEmpty().withMessage('rules is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      const product: Product = req.body;
  
      await ProductService.update(product);
  
      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  
  // DELETE products/:id
  
  productsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await ProductService.remove(id);
  
      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });


// GET products/:id
  
productsRouter.get("/evaluate-products/:days", async (req: Request, res: Response) => {
    const days: number = parseInt(req.params.days, 10);
  
    try {
      const simulateArrayProducts = await ProductService.evaluateProducts(days);
  
      res.status(200).send(simulateArrayProducts);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });
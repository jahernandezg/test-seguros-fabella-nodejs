/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as RuleService from "./rules.service";
import { Rule } from "./rule.interface";
import { Rules } from "./rules.interface";


/**
 * Router Definition
 */

export const rulesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET rules/
rulesRouter.get("/", async (req: Request, res: Response) => {
    try {
      const rules: Rules = await RuleService.findAll();
  
      res.status(200).send(rules);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });
  
  // GET rules/:key  
  rulesRouter.get("/:key", async (req: Request, res: Response) => {
    
    try {
      const rule: Rule = await RuleService.find(req.params.key);
  
      res.status(200).send(rule);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });
  
  
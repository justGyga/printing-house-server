import { Router } from "express";
// import { Validator } from "../../core/validation.js";
import SimpleController from "./controller.js";

const router = new Router();

router.post("/simpleRouter", SimpleController.simpleController);

export default router;

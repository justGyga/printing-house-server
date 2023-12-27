import { Router } from "express";
import { TokenGuard } from "../../core/token-guard.js";
import { Validator } from "../../core/validation.js";
import { objectDto } from "../commons/dtos/object-dto.js";
import { checkAdminAccess } from "../commons/middlewares/admin-checker.js";
import Controller from "./controller.js";

const router = new Router();

router.post("", TokenGuard.verify, checkAdminAccess, Validator.validate(objectDto), Controller.postObject);
router.get("", TokenGuard.verify, checkAdminAccess, Controller.getAllObjects);

export default router;

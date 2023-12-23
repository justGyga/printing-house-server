import { Router } from "express";
import { TokenGuard } from "../../core/token-guard.js";
import { Validator } from "../../core/validation.js";
import { checkAccessRight } from "../commons/middlewares/admin-checker.js";
import UserController from "./controller.js";
import { addWorkerDto } from "./dto/add-worker-dto.js";
import { signInDto } from "./dto/sign-in-dto.js";
import { signUpDto } from "./dto/sign-up-dto.js";

const router = new Router();

router.post("/signIn", Validator.validate(signInDto), UserController.signIn);
router.post("/signUp", Validator.validate(signUpDto), UserController.signUp);
router.patch("/add-worker", TokenGuard.verify, checkAccessRight, Validator.validate(addWorkerDto), UserController.addWorker);

export default router;

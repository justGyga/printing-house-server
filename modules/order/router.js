import { Router } from "express";
import { TokenGuard } from "../../core/token-guard.js";
import { CONTEXT, Validator } from "../../core/validation.js";
import { uuidDto } from "../commons/dtos/uuid-dto.js";
import OrderController from "./controller.js";
import { preOrderDto } from "./dto/preOrder-dto.js";
import { resultOrderDto } from "./dto/resultOrder-dto.js";

const router = new Router();
const preOrderRouter = new Router();
const resultOrderRouter = new Router();

preOrderRouter.post("", TokenGuard.verify, Validator.validate(preOrderDto), OrderController.createPreOrder);
preOrderRouter.get("", TokenGuard.verify, OrderController.getAllPreOrder);
preOrderRouter.get("/:id", TokenGuard.verify, Validator.validate(uuidDto, CONTEXT.PATH), OrderController.getByIdPreOrder);
preOrderRouter.patch("/:id", TokenGuard.verify, Validator.validate(preOrderDto), Validator.validate(uuidDto, CONTEXT.PATH), OrderController.patchPreOrder);
preOrderRouter.delete("/:id", TokenGuard.verify, Validator.validate(uuidDto, CONTEXT.PATH), OrderController.deletePreOrder);

resultOrderRouter.post("", TokenGuard.verify, Validator.validate(resultOrderDto), OrderController.createFinalOrder);
resultOrderRouter.get("", TokenGuard.verify, OrderController.getAllFinalOrder);
resultOrderRouter.get("/:id", TokenGuard.verify, Validator.validate(uuidDto, CONTEXT.PATH), OrderController.getByIdFinalOrder);
resultOrderRouter.patch(
    "/:id",
    TokenGuard.verify,
    Validator.validate(resultOrderDto),
    Validator.validate(uuidDto, CONTEXT.PATH),
    OrderController.patchFinalOrder
);
resultOrderRouter.delete("/:id", TokenGuard.verify, Validator.validate(uuidDto, CONTEXT.PATH), OrderController.deleteFinalOrder);

router.use("/pre", preOrderRouter);
router.use("/result", resultOrderRouter);

export default router;

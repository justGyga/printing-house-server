import { Router } from "express";
import { TokenGuard } from "../../core/token-guard.js";
import { CONTEXT, Validator } from "../../core/validation.js";
import { uuidDto } from "../commons/dtos/uuid-dto.js";
import { checkAdminAccess } from "../commons/middlewares/admin-checker.js";
import OrganizationController from "./controller.js";
import { catalogItemDto } from "./dto/post-catalog-object-dto.js";

const router = new Router();

router.post("", TokenGuard.verify, checkAdminAccess, Validator.validate(catalogItemDto), OrganizationController.addCatalogItem);
router.get("", OrganizationController.getCatalog);
router.get("/:id", Validator.validate(uuidDto, CONTEXT.PATH), checkAdminAccess, OrganizationController.getCatalogItem);
router.patch("/:id", Validator.validate(uuidDto, CONTEXT.PATH), checkAdminAccess, OrganizationController.patchCatalogItem);
router.delete("/:id", Validator.validate(uuidDto, CONTEXT.PATH), checkAdminAccess, OrganizationController.deleteCatalogItem);

export default router;

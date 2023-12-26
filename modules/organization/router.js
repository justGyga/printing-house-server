import { Router } from "express";
import { TokenGuard } from "../../core/token-guard.js";
import { CONTEXT, Validator } from "../../core/validation.js";
import { uuidDto } from "../commons/dtos/uuid-dto.js";
import { checkAdminAccess } from "../commons/middlewares/admin-checker.js";
import OrganizationController from "./controller.js";
import { organizationType } from "./dto/get-all-organizations.js";
import { catalogItemDto } from "./dto/post-catalog-object-dto.js";
import { newOrganization } from "./dto/post-new-organization.js";

const router = new Router();

router.post("", TokenGuard.verify, Validator.validate(newOrganization), OrganizationController.createOrganization);
router.get("/all", Validator.validate(organizationType, CONTEXT.QUERY), OrganizationController.getAllCompanies);
router.post("/catalog", TokenGuard.verify, checkAdminAccess, Validator.validate(catalogItemDto), OrganizationController.addCatalogItem);
router.get("/catalog", OrganizationController.getCatalog);
router.get("/catalog/:id", Validator.validate(uuidDto, CONTEXT.PATH), OrganizationController.getCatalog);
router.delete("", TokenGuard.verify, checkAdminAccess, OrganizationController.removeOrganization);

export default router;

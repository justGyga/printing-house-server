import { Router } from "express";
import { TokenGuard } from "../../core/token-guard.js";
import { CONTEXT, Validator } from "../../core/validation.js";
import { checkAccessRight } from "../commons/middlewares/admin-checker.js";
import OrganizationController from "./controller.js";
import { organizationType } from "./dto/get-all-organizations.js";
import { newOrganization } from "./dto/post-new-organization.js";

const router = new Router();

router.post("", TokenGuard.verify, Validator.validate(newOrganization), OrganizationController.createOrganization);
router.get("/all", Validator.validate(organizationType, CONTEXT.QUERY), OrganizationController.getAllCompanies);
router.delete("", TokenGuard.verify, checkAccessRight, OrganizationController.removeOrganization);

export default router;

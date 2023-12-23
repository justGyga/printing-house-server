import autoBind from "auto-bind";
import OrganizationService from "./service.js";

class OrganizationController {
    #organizationService;

    constructor() {
        autoBind(this);
        this.#organizationService = new OrganizationService();
    }

    async createOrganization(req, res) {
        try {
            const [userRoleStatus, orgExistsStatus, organizationId] = await this.#organizationService.createOrganization(req.body, req.user.id);
            if (userRoleStatus) return res.status(403).json({ message: "You are already a member of the organization" });
            if (orgExistsStatus) return res.status(400).json({ message: "Organization already exists" });
            res.status(200).json(organizationId);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async getAllCompanies(req, res) {
        try {
            const organizations = await this.#organizationService.getAllOrganizations(req.query.type);
            res.status(200).json(organizations);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async removeOrganization(req, res) {
        try {
            await this.#organizationService.deleteOrganization(req.organization.id);
            res.status(204).end();
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }
}

export default new OrganizationController();

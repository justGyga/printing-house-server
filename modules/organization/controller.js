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
            if (!userRoleStatus) return res.status(403).json({ message: "You are already a member of the organization" });
            if (!orgExistsStatus) return res.status(400).json({ message: "Organization already exists" });
            res.status(200).json({ organizationId });
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

    async getCatalog(req, res) {
        try {
            res.status(200).json(await this.#organizationService.getCatalog());
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async getCatalogItem(req, res) {
        try {
            res.status(200).json(await this.#organizationService.getCatalogItem(req.params.id));
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async addCatalogItem(req, res) {
        try {
            const catalogId = await this.#organizationService.addCatalogItem(req.files.picture, req.body);
            if (!catalogId) throw new Error();
            res.status(200).json({ catalogId });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async patchCatalogItem(req, res) {
        try {
            await this.#organizationService.editCatalogItem(req.body, req.params.id);
            res.status(200).json({ message: "Patched" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async deleteCatalogItem(req, res) {
        try {
            await this.#organizationService.deleteCatalogItem(req.params.id);
            res.status(200).json({ message: "Patched" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async patchOrganization(req, res) {
        try {
            await this.#organizationService.editOrganizationData(req.body, req.params.id);
            res.status(200).json({ message: "Patched" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async getOrgManagers(req, res) {
        try {
            res.status(200).json(await this.#organizationService.getOrganizationManagers(req.params.id));
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }
}

export default new OrganizationController();

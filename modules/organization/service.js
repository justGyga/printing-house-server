import { ROLE } from "../commons/enums/user-role.js";
import User from "../user/models/user.js";
import Organization from "./models/organization.js";

class OrganizationService {
    async createOrganization(doc, ownerId) {
        const user = await User.findByPk(ownerId);
        if (user.role != 4 && user.organizationId) return [false, false, false];
        if (await Organization.findOne({ where: { inn: doc.inn } })) return [true, false, false];
        const org = await Organization.create(doc);
        await User.update({ organizationId: org.id, role: ROLE.ADMIN }, { where: { id: ownerId } });
        return [true, true, org.id];
    }

    async getAllOrganizations(type) {
        return await Organization.findAll({ attributes: ["id", "name", "number", "address"], where: { type } });
    }

    async deleteOrganization(organizationId) {
        await User.update({ organizationId: null, role: ROLE.NON_ROLE }, { where: { organizationId } });
        await Organization.destroy({ where: { id: organizationId } });
        return true;
    }
}

export default OrganizationService;

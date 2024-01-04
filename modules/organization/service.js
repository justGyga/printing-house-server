import _ from "lodash";
import { ROLE } from "../commons/enums/user-role.js";
import User from "../user/models/user.js";
import Catalog from "./models/catalog.js";
import Organization from "./models/organization.js";

class OrganizationService {
    async createOrganization(doc, ownerId) {
        const user = await User.findByPk(ownerId);
        if (user.role != 4 && user.organizationId) return [false, false, false];
        if (await Organization.findOne({ where: { name: doc.name } })) return [true, false, false];
        const org = await Organization.create(doc);
        await User.update({ organizationId: org.id, role: ROLE.DIRECTOR }, { where: { id: ownerId } });
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

    // TODO: ADD PAGINATION
    async getCatalog() {
        const catalog = await Catalog.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });
        return catalog.map((item) => {
            return { ..._.omit(item, "picture"), picture: `${process.env.APP_DOMAIN}${item.picture}` };
        });
    }

    async getCatalogItem(id) {
        const item = await Catalog.findByPk(id);
        if (!item) return false;
        item.picture = `${process.env.APP_DOMAIN}${item.picture}`;
        return _.omit(item, "createdAt", "updatedAt");
    }

    async addCatalogItem(picture, doc) {
        const dir = `/${new Date() / 1000}.${picture.name.split(".").at(-1)}`;
        const catalogItem = await Catalog.create({ ...doc, picture: dir });
        picture.mv(`./resources${dir}`, (error) => {
            if (error) {
                console.log(error.message);
            }
        });
        return { id: catalogItem.id, url: `${process.env.APP_DOMAIN}${dir}` };
    }

    async editOrganizationData(doc, id) {
        await Organization.update(doc, { where: { id } });
    }
}

export default OrganizationService;

import _ from "lodash";
import { ROLE } from "../commons/enums/user-role.js";
import User from "../user/models/user.js";
import ResultOrder from "./models/order.js";
import PreOrder from "./models/temp-order.js";

class OrderService {
    async createPreOrder(user, doc) {
        const { organizationId } = await User.findByPk(user.id);
        if (!organizationId) return false;
        const order = await PreOrder.create({ ...doc, organizationId });
        return _.omit(order, "createdAt", "updatedAt");
    }

    async createResultOrder(user, doc) {
        if (user.role != ROLE.ADMIN) return false;
        const order = await ResultOrder.create(doc);
        if (doc.preOrderId) await PreOrder.destroy({ where: { organizationId: doc.preOrderId } });
        return _.omit(order, "createdAt", "updatedAt");
    }

    async getAllPreOrder(user) {
        const { organizationId } = await User.findByPk(user.id);
        if (!organizationId) return false;
        return await PreOrder.findAll({ where: { organizationId } });
    }

    async getAllResultOrder(user) {
        if (user.role != ROLE.ADMIN) return false;
        return await ResultOrder.findAll();
    }

    async getByIdPreOrder(user, id) {
        const { organizationId } = await User.findByPk(user.id);
        if (!organizationId) return [false, false];
        const orderFindStatus = await PreOrder.findByPk(id, {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });
        if (!orderFindStatus) return [true, false];
        return [true, orderFindStatus];
    }

    async getByIdResultOrder(user, id) {
        if (user.role != ROLE.ADMIN) return [false, false];
        const orderFindStatus = await ResultOrder.findByPk(id, {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });
        if (!orderFindStatus) return [true, false];
        return [true, true, orderFindStatus];
    }

    async editPreOrder(user, id, doc) {
        const order = await PreOrder.findByPk(id);
        const { organizationId } = await User.findByPk(user.id);
        if (order.organizationId != organizationId) return false;
        await PreOrder.update(doc, { where: { id } });
        return true;
    }

    async editResultOrder(user, id, doc) {
        if (user.role != ROLE.ADMIN) return false;
        await ResultOrder.update(doc, { where: { id } });
        return true;
    }

    async deletePreOrder(user, id) {
        const order = await PreOrder.findByPk(id);
        const { organizationId } = await User.findByPk(user.id);
        if (order.organizationId != organizationId) return false;
        await PreOrder.destroy({ where: { id } });
        return true;
    }

    async deleteResultOrder(user, id) {
        if (user.role != ROLE.ADMIN) return false;
        await ResultOrder.destroy({ where: { id } });
        return true;
    }
}

export default OrderService;

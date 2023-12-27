/* eslint-disable indent */
/* eslint-disable default-case */
import _ from "lodash";
import { ORDER_TYPE } from "../commons/enums/order-type.js";
import { ROLE } from "../commons/enums/user-role.js";
import dtfService from "../dtf-printing/service.js";
import LargeFormatOrder from "../large-format-printing/models/order.js";
import OffsetService from "../offset-printing/service.js";
import SublService from "../sublimation-printing/service.js";
import UltravioletService from "../ultraviolet-printing/service.js";
import User from "../user/models/user.js";
import ResultOrder from "./models/order.js";
import PreOrder from "./models/temp-order.js";

class OrderService {
    async #createSubTable(doc, type) {
        let printingId;
        switch (type) {
            case ORDER_TYPE.DTF:
                printingId = await dtfService.createOrder(doc.objectId);
                break;
            case ORDER_TYPE.LARGE_FORMAT:
                printingId = await LargeFormatOrder.create(doc);
                break;
            case ORDER_TYPE.OFFSET:
                printingId = await OffsetService.createOffsetOrder(doc);
                break;
            case ORDER_TYPE.SUBLIMATION:
                printingId = await SublService.createOrder(doc.objectId);
                break;
            case ORDER_TYPE.ULTRAVIOLET:
                printingId = await UltravioletService.createOrder(doc.objectId);
                break;
        }
        return printingId;
    }

    async #getSubOrder(id, type) {
        let order;
        switch (type) {
            case ORDER_TYPE.DTF:
                order = await dtfService.getOrderById(id);
                break;
            case ORDER_TYPE.LARGE_FORMAT:
                order = await LargeFormatOrder.create(id);
                break;
            case ORDER_TYPE.OFFSET:
                order = await OffsetService.getOrderById(id);
                break;
            case ORDER_TYPE.SUBLIMATION:
                order = await SublService.getOrderById(id);
                break;
            case ORDER_TYPE.ULTRAVIOLET:
                order = await UltravioletService.getOrderById(id);
                break;
        }
        return order;
    }

    async #patchSubOrder(id, type, doc) {
        switch (type) {
            case ORDER_TYPE.LARGE_FORMAT:
                await LargeFormatOrder.create(id);
                break;
            case ORDER_TYPE.OFFSET:
                await OffsetService.patchOffsetOrder(id, doc);
                break;
        }
    }

    async createPreOrder(user, doc) {
        const { organizationId } = await User.findByPk(user.id);
        if (!organizationId) return false;
        const order = await PreOrder.create({ ...doc, organizationId });
        return order.id;
    }

    async createResultOrder(user, doc) {
        if (user.role != ROLE.ADMIN) return false;
        const printingId = await this.#createSubTable(doc.subDoc, doc.type);
        const order = await ResultOrder.create({ ..._.omit(doc, "subDoc"), printingId });
        if (!printingId) return [true, false];
        if (doc.preOrderId) await PreOrder.destroy({ where: { organizationId: doc.preOrderId } });
        return [true, order.id];
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
                exclude: ["updatedAt"]
            }
        });
        if (!orderFindStatus) return [true, false];
        return [true, orderFindStatus];
    }

    async getByIdResultOrder(user, id) {
        if (user.role != ROLE.ADMIN) return [false, false];
        const orderFindStatus = await ResultOrder.findByPk(id, {
            attributes: {
                exclude: ["updatedAt"]
            }
        });
        if (!orderFindStatus) return [true, false];
        orderFindStatus.orderBody = await this.#getSubOrder(orderFindStatus.printingId, orderFindStatus.type);
        delete orderFindStatus.printingId;
        return [true, orderFindStatus];
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
        const { printingId, type } = await ResultOrder.findByPk(id);
        await this.#patchSubOrder(printingId, type, doc.subDoc);
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
        const { printingId, type } = await ResultOrder.findByPk(id);
        if (type == ORDER_TYPE.OFFSET) await OffsetService.deleteOrderById(printingId);
        if (type == ORDER_TYPE.DTF) await dtfService.deleteOrder(printingId);
        if (type == ORDER_TYPE.SUBLIMATION) await SublService.deleteOrder(printingId);
        if (type == ORDER_TYPE.ULTRAVIOLET) await UltravioletService.deleteOrder(printingId);
        await ResultOrder.destroy({ where: { id } });
        return true;
    }
}

export default OrderService;

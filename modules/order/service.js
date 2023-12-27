/* eslint-disable indent */
/* eslint-disable default-case */
import _ from "lodash";
import { ORDER_TYPE } from "../commons/enums/order-type.js";
import { ROLE } from "../commons/enums/user-role.js";
import dtfPrintingOrder from "../dtf-printing/models/order.js";
import LargeFormatOrder from "../large-format-printing/models/order.js";
import OffsetService from "../offset-printing/service.js";
import SublimationOrder from "../sublimation-printing/models/order.js";
import UltravioletOrder from "../ultraviolet-printing/models/order.js";
import User from "../user/models/user.js";
import ResultOrder from "./models/order.js";
import PreOrder from "./models/temp-order.js";

class OrderService {
    async #createSubTable(doc, type) {
        let printingId;
        switch (type) {
            case ORDER_TYPE.DTF:
                printingId = await dtfPrintingOrder.create(doc);
                break;
            case ORDER_TYPE.LARGE_FORMAT:
                printingId = await LargeFormatOrder.create(doc);
                break;
            case ORDER_TYPE.OFFSET:
                printingId = await OffsetService.createOffsetOrder(doc);
                break;
            case ORDER_TYPE.SUBLIMATION:
                printingId = await SublimationOrder.create(doc);
                break;
            case ORDER_TYPE.ULTRAVIOLET:
                printingId = await UltravioletOrder.create(doc);
                break;
        }
        return printingId;
    }

    async #getSubOrder(id, type) {
        let order;
        switch (type) {
            case ORDER_TYPE.DTF:
                order = await dtfPrintingOrder.create(id);
                break;
            case ORDER_TYPE.LARGE_FORMAT:
                order = await LargeFormatOrder.create(id);
                break;
            case ORDER_TYPE.OFFSET:
                order = await OffsetService.getOrderById(id);
                break;
            case ORDER_TYPE.SUBLIMATION:
                order = await SublimationOrder.create(id);
                break;
            case ORDER_TYPE.ULTRAVIOLET:
                order = await UltravioletOrder.create(id);
                break;
        }
        return order;
    }

    async #patchSubOrder(id, type, doc) {
        switch (type) {
            case ORDER_TYPE.DTF:
                await dtfPrintingOrder.create(id);
                break;
            case ORDER_TYPE.LARGE_FORMAT:
                await LargeFormatOrder.create(id);
                break;
            case ORDER_TYPE.OFFSET:
                await OffsetService.patchOffsetOrder(id, doc);
                break;
            case ORDER_TYPE.SUBLIMATION:
                await SublimationOrder.create(id);
                break;
            case ORDER_TYPE.ULTRAVIOLET:
                await UltravioletOrder.create(id);
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
        if (doc.preOrderId) await PreOrder.destroy({ where: { organizationId: doc.preOrderId } });
        return order.id;
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
        await ResultOrder.destroy({ where: { id } });
        return true;
    }
}

export default OrderService;

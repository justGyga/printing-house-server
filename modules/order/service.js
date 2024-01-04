/* eslint-disable indent */
/* eslint-disable default-case */
import _ from "lodash";
import { ORDER_STATUS } from "../commons/enums/order-status.js";
import { ORDER_TYPE } from "../commons/enums/order-type.js";
import { ROLE } from "../commons/enums/user-role.js";
import dtfPrintingObject from "../dtf-printing/models/printing-object.js";
import dtfService from "../dtf-printing/service.js";
import LargeFormatPrintingObject from "../large-format-printing/models/printing-object.js";
import LargeFormatService from "../large-format-printing/service.js";
import PaperOffset from "../offset-printing/models/paper.js";
import OffsetService from "../offset-printing/service.js";
import SublimationPrintingObject from "../sublimation-printing/models/printing-object.js";
import SublService from "../sublimation-printing/service.js";
import UltravioletPrintingObject from "../ultraviolet-printing/models/printing-object.js";
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
                printingId = await LargeFormatService.createOrder(doc);
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
                order = await LargeFormatService.getOrder(id);
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
                await LargeFormatService.patchOrder(id);
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

    async getOrderStatus(user, id) {
        if (user.role == ROLE.NON_ROLE) return [false, false, false];
        const resultOrder = await ResultOrder.findByPk(id);
        const preOrder = await PreOrder.findByPk(id);
        const userData = await User.findByPk(user.id);
        if (userData.organizationId != resultOrder.organizationId && resultOrder) return [true, false];
        if (userData.organizationId != preOrder.organizationId && preOrder) return [true, true, ORDER_STATUS.PENDING];
        return [true, true, resultOrder.status];
    }

    async editOrderStatus(id, status) {
        await ResultOrder.update(status, { where: { id } });
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
        if (type == ORDER_TYPE.LARGE_FORMAT) await LargeFormatService.deleteOrder(printingId);
        await ResultOrder.destroy({ where: { id } });
        return true;
    }

    async deletePrintingObject(id) {
        await dtfPrintingObject.destroy({ where: { id } });
        await LargeFormatPrintingObject.destroy({ where: { id } });
        await PaperOffset.destroy({ where: { id } });
        await SublimationPrintingObject.destroy({ where: { id } });
        await UltravioletPrintingObject.destroy({ where: { id } });
    }
}

export default OrderService;

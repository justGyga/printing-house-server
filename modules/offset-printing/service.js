import _ from "lodash";
import CuttingOffset from "./models/cutting.js";
import EmbossingOffset from "./models/embossing.js";
import LaminationOffset from "./models/lamination.js";
import OffsetPolishOffset from "./models/offset-polish.js";
import OffsetOrder from "./models/order.js";
import PaperOffset from "./models/paper.js";
import VarnishingOffset from "./models/varnishing.js";

class OffsetService {
    static async createOffsetOrder(doc) {
        const order = await OffsetOrder.create(_.omit(doc, "cutting", "embossing", "lamination", "polish", "paper", "varnishing"));
        if (doc.polish) await OffsetPolishOffset.create({ ...doc.polish, orderId: order.id });
        if (doc.paper) await PaperOffset.create({ ...doc.paper, orderId: order.id });
        if (doc.cutting) await CuttingOffset.create({ ...doc.cutting, orderId: order.id });
        if (doc.embossing) await EmbossingOffset.create({ ...doc.embossing, orderId: order.id });
        if (doc.lamination) await LaminationOffset.create({ ...doc.lamination, orderId: order.id });
        if (doc.varnishing) await VarnishingOffset.create({ ...doc.varnishing, orderId: order.id });
        return order.id;
    }

    static async patchOffsetOrder(id, doc) {
        const order = await OffsetOrder.update(_.omit(doc, "cutting", "embossing", "lamination", "polish", "paper", "varnishing"), { where: { id } });
        if (doc.polish) await OffsetPolishOffset.update(doc.polish, { where: { orderId: id } });
        if (doc.paper) await PaperOffset.update(doc.paper, { where: { orderId: id } });
        if (doc.cutting) await CuttingOffset.update(doc.cutting, { where: { orderId: id } });
        if (doc.embossing) await EmbossingOffset.update(doc.embossing, { where: { orderId: id } });
        if (doc.lamination) await LaminationOffset.update(doc.lamination, { where: { orderId: id } });
        if (doc.varnishing) await VarnishingOffset.update(doc.varnishing, { where: { orderId: id } });
        return order.id;
    }

    async getOffsetPaper() {
        const allPapers = await PaperOffset.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });
        return [...new Set(allPapers.map((item) => item.name))];
    }

    static async getOrderById(id) {
        const order = await OffsetOrder.findByPk(id, {
            attributes: { exclude: ["updatedAt"] },
            include: [
                { model: OffsetPolishOffset, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: PaperOffset, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: CuttingOffset, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: EmbossingOffset, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: VarnishingOffset, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ],
            raw: true
        });
        return order;
    }

    static async deleteOrderById(id) {
        await OffsetOrder.destroy({ where: { id } });
    }
}

export default OffsetService;

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
        await OffsetPolishOffset.create({ ...doc.polish, orderId: order.id });
        await PaperOffset.create({ ...doc.paper, orderId: order.id });
        await CuttingOffset.create({ ...doc.cutting, orderId: order.id });
        await EmbossingOffset.create({ ...doc.embossing, orderId: order.id });
        await LaminationOffset.create({ ...doc.lamination, orderId: order.id });
        await VarnishingOffset.create({ ...doc.varnishing, orderId: order.id });
        return order.id;
    }

    static async getOrderById(id) {
        const order = await OffsetOrder.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                { model: OffsetPolishOffset, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: PaperOffset, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: CuttingOffset, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: EmbossingOffset, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: VarnishingOffset, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ]
        });
        return order;
    }

    static async deleteOrderById(id) {
        await OffsetOrder.destroy({ where: { orderId: id } });
    }
}

export default OffsetService;

import _ from "lodash";
import Grommet from "./models/grommet.js";
import Lamination from "./models/lamination.js";
import Order from "./models/order.js";
import Object from "./models/printing-object.js";

class LargeFormatService {
    static async createOrder(doc) {
        const order = await Order.create({ ..._.pick(doc, "description") });
        await Lamination.create({ orderId: order.id, ...doc.lamination });
        await Grommet.create({ orderId: order.id, ...doc.grommet });
        await Object.create({ orderId: order.id, ...doc.object });
        return order.id;
    }

    static async getOrder(id) {
        const order = await Order.findByPk(id, {
            attributes: { exclude: ["updatedAt"] },
            include: [
                { model: Object, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Lamination, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Grommet, attributes: { exclude: ["createdAt", "updatedAt"] } }
            ],
            raw: true
        });
        return order;
    }

    static async patchOrder(id, doc) {
        await Order.update({ ..._.pick(doc, "description") }, { where: { id } });
        if (doc.object) Object.update(doc.object, { where: { orderId: id } });
        if (doc.grommet) Grommet.update(doc.grommet, { where: { orderId: id } });
        if (doc.lamination) Lamination.update(doc.lamination, { where: { orderId: id } });
    }
    static async deleteOrder(id) {
        await Order.destroy({ where: { id } });
    }
}

export default LargeFormatService;

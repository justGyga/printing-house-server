import Order from "./models/order.js";
import Object from "./models/printing-object.js";

class SublService {
    static async createOrder(objectId) {
        const printingObjectFindStatus = await Object.findByPk(objectId);
        if (!printingObjectFindStatus) return false;
        const order = await Order.create({ objectId });
        return order.id;
    }

    static async getOrderById(id) {
        const orders = await Order.findByPk(id, {
            attributes: { exclude: "updatedAt" },
            include: [{ model: Object, attributes: { exclude: ["createdAt", "updatedAt"] } }],
            raw: true
        });
        return orders;
    }

    async getAllObjects() {
        return await Object.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });
    }

    async createObject(doc) {
        if (await Object.findOne({ where: { url: doc.url } })) return false;
        const obj = await Object.create(doc);
        return obj.id;
    }

    static async deleteOrder(id) {
        await Order.destroy({ where: { id } });
    }
}

export default SublService;

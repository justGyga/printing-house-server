import Order from "./models/order.js";
import Object from "./models/printing-object.js";

class dtfService {
    static async createOrder(objectId) {
        const printingObjectFindStatus = await Object.findByPk(objectId);
        if (!printingObjectFindStatus) return false;
        const order = await Order.create({ objectId });
        return order.id;
    }

    static async getOrderById(id) {
        const order = await Order.findByPk(id, {
            attributes: { exclude: "updatedAt" },
            include: [{ model: Object, attributes: { exclude: ["createdAt", "updatedAt"] } }],
            raw: true
        });
        return order;
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

export default dtfService;

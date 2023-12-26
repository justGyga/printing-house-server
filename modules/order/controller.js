import autoBind from "auto-bind";
import OrderService from "./service.js";

class OrderController {
    #orderService;

    constructor() {
        autoBind(this);
        this.#orderService = new OrderService();
    }

    async createPreOrder(req, res) {
        try {
            const order = await this.#orderService.createPreOrder(req.user, req.body);
            if (!order) return res.status(403).json({ message: "Has not access" });
            res.status(200).json({ order });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async createFinalOrder(req, res) {
        try {
            const order = await this.#orderService.createResultOrder(req.user, req.body);
            if (!order) return res.status(403).json({ message: "Has not access" });
            res.status(200).json({ order });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async patchPreOrder(req, res) {
        try {
            const orderEditStatus = await this.#orderService.editPreOrder(req.user, req.params.id, req.body);
            if (!orderEditStatus) return res.status(403).json({ message: "Has not access" });
            res.status(200).json({ orderEditStatus });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async patchFinalOrder(req, res) {
        try {
            const orderEditStatus = await this.#orderService.editResultOrder(req.user, req.params.id, req.body);
            if (!orderEditStatus) return res.status(403).json({ message: "Has not access" });
            res.status(200).json({ orderEditStatus });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async deletePreOrder(req, res) {
        try {
            const orderDeleteStatus = await this.#orderService.deletePreOrder(req.user, req.params.id);
            if (!orderDeleteStatus) return res.status(403).json({ message: "Has not access" });
            res.status(200).json({ orderDeleteStatus });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async deleteFinalOrder(req, res) {
        try {
            const orderDeleteStatus = await this.#orderService.deleteResultOrder(req.user, req.params.id);
            if (!orderDeleteStatus) return res.status(403).json({ message: "Has not access" });
            res.status(200).json({ orderDeleteStatus });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }
}

export default new OrderController();

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
            res.status(201).json({ order });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async createFinalOrder(req, res) {
        try {
            const [error, order] = await this.#orderService.createResultOrder(req.user, req.body);
            if (!error) return res.status(403).json({ message: "Has not access" });
            if (!order) return res.status(404).json({ message: "Object not found" });
            res.status(201).json({ order });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async getAllPreOrder(req, res) {
        try {
            const ordersFindStatus = await this.#orderService.getAllPreOrder(req.user);
            if (!ordersFindStatus) return res.status(403).json({ message: "Has not access" });
            res.status(200).json(ordersFindStatus);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async getAllFinalOrder(req, res) {
        try {
            const ordersFindStatus = await this.#orderService.getAllResultOrder(req.user);
            if (!ordersFindStatus) return res.status(403).json({ message: "Has not access" });
            res.status(200).json(ordersFindStatus);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async getOrderStatus(req, res) {
        try {
            const [nonAccess, orgAccess, status] = this.#orderService.getOrderStatus(req.user, req.params.id);
            if (!nonAccess) return res.status(403).json({ message: "Non member of organization" });
            if (!orgAccess) return res.status(403).json({ message: "Non accessed in that company" });
            res.status(200).json({ status });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async patchOrderStatus(req, res) {
        try {
            await this.#orderService.editOrderStatus(req.params.id, req.body.status);
            res.status(200).json({ message: "Pathced" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async getByIdPreOrder(req, res) {
        try {
            const [accessStatus, orderFindStatus] = await this.#orderService.getByIdPreOrder(req.user, req.params.id);
            if (!accessStatus) return res.status(403).json({ message: "Has not access" });
            if (!orderFindStatus) return res.status(404).json({ message: "order not found" });
            res.status(200).json(orderFindStatus);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async getByIdFinalOrder(req, res) {
        try {
            const [accessStatus, orderFindStatus] = await this.#orderService.getByIdResultOrder(req.user, req.params.id);
            if (!accessStatus) return res.status(403).json({ message: "Has not access" });
            if (!orderFindStatus) return res.status(404).json({ message: "order not found" });
            res.status(200).json(orderFindStatus);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async patchPreOrder(req, res) {
        try {
            const orderEditStatus = await this.#orderService.editPreOrder(req.user, req.params.id, req.body);
            if (!orderEditStatus) return res.status(403).json({ message: "Has not access" });
            res.status(200).end();
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async patchFinalOrder(req, res) {
        try {
            const orderEditStatus = await this.#orderService.editResultOrder(req.user, req.params.id, req.body);
            if (!orderEditStatus) return res.status(403).json({ message: "Has not access" });
            res.status(200).end();
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async deletePreOrder(req, res) {
        try {
            const orderDeleteStatus = await this.#orderService.deletePreOrder(req.user, req.params.id);
            if (!orderDeleteStatus) return res.status(403).json({ message: "Has not access" });
            res.status(204).end();
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async deleteFinalOrder(req, res) {
        try {
            const orderDeleteStatus = await this.#orderService.deleteResultOrder(req.user, req.params.id);
            if (!orderDeleteStatus) return res.status(403).json({ message: "Has not access" });
            res.status(204).end();
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }

    async deletePrintingObject(req, res) {
        try {
            await this.#orderService.deletePrintingObject(req.params.id);
            res.status(204).end();
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Ooops... Something went wrong" });
        }
    }
}

export default new OrderController();

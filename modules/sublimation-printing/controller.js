import autoBind from "auto-bind";
import SublService from "./service.js";

class SublController {
    #Service;
    constructor() {
        autoBind(this);
        this.#Service = new SublService();
    }

    async postObject(req, res) {
        try {
            const result = await this.#Service.createObject(req.doc);
            if (!result) return res.status(401).json({ message: "Already exist" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ooops... Something went wrong!" });
        }
    }

    async getAllObjects(req, res) {
        try {
            res.status(200).json(await this.#Service.getAllObjects());
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ooops... Something went wrong!" });
        }
    }
}

export default new SublController();

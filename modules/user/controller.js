import autoBind from "auto-bind";
import SimpleService from "./service.js";

class SimpleController {
    #simpleService;
    constructor() {
        autoBind(this);
        this.#simpleService = new SimpleService();
    }

    async simpleController(req, res) {
        try {
            const result = await this.#simpleService.simpleServiceMethod(req.body.message);
            res.status(200).json(result);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Oops, something went wrong!" });
        }
    }
}

export default new SimpleController();

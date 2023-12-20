import autoBind from "auto-bind";
import UserService from "./service.js";

class SimpleController {
    #userService;
    constructor() {
        autoBind(this);
        this.#userService = new UserService();
    }

    async signUp(req, res) {
        try {
            const token = await this.#userService.registration(req.body);
            if (!token) return res.status(409).json({ message: "User already exists" });
            res.status(201).json({ token });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Oops, something went wrong!" });
        }
    }

    async signIn(req, res) {
        try {
            const token = await this.#userService.authorization(req.body.userId, req.body.companyId);
            if (!token) return res.status(404).json({ message: "Login or password is not corrected" });
            res.status(200).json({ token });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Oops, something went wrong!" });
        }
    }

    async addWorker(req, res) {
        try {
            const result = await this.#userService.attachUserToCompany(req.body.userId, req.company.id, req.body.role);
            if (!result) return res.status(404).json({ message: "User not found" });
            res.status(202).end();
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Oops, something went wrong!" });
        }
    }
}

export default new SimpleController();

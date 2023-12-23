import User from "../../user/models/user.js";
import { ROLE } from "../enums/user-role.js";

export const checkAccessRight = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (user.role != ROLE.ADMIN) return res.status(403).json({ message: "You are not admin" });
    req.organization = { id: user.organizationId };
    next();
};

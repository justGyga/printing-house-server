/* eslint-disable indent */
import { CONTEXT } from "../../../core/validation.js";
import User from "../../user/models/user.js";
import { ROLE } from "../enums/user-role.js";

export const checkAdminAccess = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (user.role != ROLE.ADMIN) return res.status(403).json({ message: "You are not admin" });
    req.organization = { id: user.organizationId };
    next();
};

export const checkAccessRight =
    (payloadKey = CONTEXT.QUERY) =>
    async (req, res, next) => {
        const user = await User.findByPk(req.user.id);
        if (user.role == ROLE.NON_ROLE && user.organizationId != req[payloadKey].organizationId) {
            return res.status(403).json({ message: "You have not rights by that company" });
        }
        next();
    };

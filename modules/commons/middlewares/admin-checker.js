/* eslint-disable indent */
import User from "../../user/models/user.js";
import { ROLE } from "../enums/user-role.js";

export const checkAdminAccess = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (user.role != ROLE.ADMIN) return res.status(403).json({ message: "You are not admin" });
    next();
};

export const checkAccessRight = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (user.role == ROLE.NON_ROLE && !user.organizationId) {
        return res.status(403).json({ message: "You have not rights by that company" });
    }
    req.user.organizationId = user.organizationId;
    next();
};

export const checkOrgAccess = async (req, res, next) => {
    if (req.params.id != req.user.organizationId) {
        return res.status(403).json({ message: "You have not rights by that company" });
    }
    next();
};

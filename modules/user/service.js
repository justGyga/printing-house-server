import argon2 from "argon2";
import _ from "lodash";
import { Op } from "sequelize";
import { TokenGuard } from "../../core/token-guard.js";
import { ROLE } from "../commons/enums/user-role.js";
import User from "./models/user.js";

class userService {
    async registration(doc) {
        if (await User.count({ where: { login: { [Op.iLike]: doc.login } }, raw: true })) {
            return false;
        }
        doc.password = await argon2.hash(doc.password);
        const newUser = await User.create(doc);
        return TokenGuard.generate(_.pick(newUser, "id", "role"));
    }

    async authorization(login, password) {
        const userFindStatus = await User.findOne({
            where: {
                login: { [Op.iLike]: login }
            },
            raw: true
        });
        if (!userFindStatus || !(await argon2.verify(userFindStatus.password, password))) return false;
        return await TokenGuard.generate(_.pick(userFindStatus, "id", "role"));
    }

    async attachUserToCompany(userId, organizationId, role) {
        const userFindStatus = await User.findByPk(userId);
        if (!userFindStatus) return false;
        await User.update({ organizationId, role }, { where: { id: userId } });
        return true;
    }

    async detachUserFromCompany(userId, organizationId) {
        const userFindStatus = await User.findByPk(userId);
        if (!userFindStatus) return false;
        await User.update({ organizationId, role: ROLE.NON_ROLE }, { where: { id: userId } });
        return true;
    }
}

export default userService;

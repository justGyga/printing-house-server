import argon2 from "argon2";
import _ from "lodash";
import { Op } from "sequelize";
import { TokenGuard } from "../../core/token-guard.js";
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

    async attachUserToCompany(userId, companyId, role) {
        const userFindStatus = await User.findByPk(userId);
        if (!userFindStatus) return false;
        userFindStatus.companyId = companyId;
        userFindStatus.role = role;
        await userFindStatus.save();
        return true;
    }
}

export default userService;

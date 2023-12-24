import { DataTypes, Model } from "sequelize";
import { ROLE } from "../../commons/enums/user-role.js";
import Organization from "../../organization/models/organization.js";

export default class User extends Model {}

export const userInitter = (sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING
            },
            mail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.INTEGER,
                defaultValue: ROLE.NON_ROLE,
                validate: { isIn: [Object.values(ROLE)] }
            }
        },
        { sequelize, updatedAt: false, tableName: "user" }
    );
    return () => {
        User.belongsTo(Organization, { foreignKey: "organizationId", onDelete: "CASCADE" });
    };
};

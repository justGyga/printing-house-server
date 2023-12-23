import { DataTypes, Model } from "sequelize";
import { ORGANIZATION_TYPE } from "../../commons/enums/organization-type.js";
import User from "../../user/models/user.js";

export default class Organization extends Model {}

export const organizationInitter = (sequelize) => {
    Organization.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { isIn: [Object.values(ORGANIZATION_TYPE)] }
            },
            inn: {
                type: DataTypes.STRING,
                allowNull: false
            },
            number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { sequelize, updatedAt: false, tableName: "organization" }
    );
    return () => {
        Organization.hasMany(User, { foreignKey: "organizationId", onDelete: "CASCADE" });
    };
};

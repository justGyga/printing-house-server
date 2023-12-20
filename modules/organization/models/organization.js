import { DataTypes, Model } from "sequelize";
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
                type: DataTypes.STRING,
                allowNull: false,
                validate: { isIn: [] }
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
        { sequelize, updatedAt: false, tableName: "user" }
    );
    return () => {
        Organization.hasMany(User, { foreignKey: "organizationId", onDelete: "CASCADE" });
    };
};

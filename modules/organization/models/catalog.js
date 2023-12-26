import { DataTypes, Model } from "sequelize";
import Organization from "./organization.js";

export default class Catalog extends Model {}

export const catalogInitter = (sequelize) => {
    Catalog.init(
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
            picture: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, tableName: "catalog" }
    );
    return () => {
        Catalog.belongsTo(Organization, { foreignKey: "organizationId", onDelete: "CASCADE" });
    };
};

import { DataTypes, Model } from "sequelize";
import OffsetOrder from "./order.js";

export default class CuttingOffset extends Model {}

export const cuttingOffsetInitter = (sequelize) => {
    CuttingOffset.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            width: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            height: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, updatedAt: false, tableName: "cutting-offset" }
    );
    return () => {
        CuttingOffset.belongsTo(OffsetOrder, { foreignKey: "cuttingId", as: "cutting-offset-id", onDelete: "CASCADE" });
    };
};

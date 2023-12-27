import { DataTypes, Model } from "sequelize";
import UltravioletPrintingObject from "./printing-object.js";

export default class UltravioletOrder extends Model {}

export const ultravioletPrintingOrderInitter = (sequelize) => {
    UltravioletOrder.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, tableName: "ultraviolet-order" }
    );
    return () => {
        UltravioletOrder.belongsTo(UltravioletPrintingObject, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

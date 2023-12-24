import { DataTypes, Model } from "sequelize";
import UltravioletPrintingObject from "./printing-object";

export default class UltravioletPrintingOrder extends Model {}

export const ultravioletPrintingOrderInitter = (sequelize) => {
    UltravioletPrintingOrder.init(
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
        { sequelize, updatedAt: false, tableName: "ultraviolet-printing-ORder" }
    );
    return () => {
        UltravioletPrintingOrder.hasMany(UltravioletPrintingObject, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

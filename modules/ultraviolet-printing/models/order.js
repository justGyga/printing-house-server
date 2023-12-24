import { DataTypes, Model } from "sequelize";
import SublimationPrintingObject from "./printing-object";

export default class SublimationPrintingOrder extends Model {}

export const sublimationPrintingOrderInitter = (sequelize) => {
    SublimationPrintingOrder.init(
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
        { sequelize, updatedAt: false, tableName: "dtf-printing-ORder" }
    );
    return () => {
        SublimationPrintingOrder.hasMany(SublimationPrintingObject, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

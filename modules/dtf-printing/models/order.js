import { DataTypes, Model } from "sequelize";
import dtfPrintingObject from "./printing-object.js";

export default class dtfPrintingOrder extends Model {}

export const dtfPrintingOrderInitter = (sequelize) => {
    dtfPrintingOrder.init(
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
        { sequelize, tableName: "dtf-order" }
    );
    return () => {
        dtfPrintingOrder.hasMany(dtfPrintingObject, { foreignKey: "orderId", onDelete: "CASCADE" });
    };
};

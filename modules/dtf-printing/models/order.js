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
            }
        },
        { sequelize, tableName: "dtf-order" }
    );
    return () => {
        dtfPrintingOrder.belongsTo(dtfPrintingObject, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

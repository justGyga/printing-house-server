import { DataTypes, Model } from "sequelize";
import dtfPrintingObject from "./printing-object";

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
        { sequelize, updatedAt: false, tableName: "dtf-printing-ORder" }
    );
    return () => {
        dtfPrintingOrder.hasMany(dtfPrintingObject, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

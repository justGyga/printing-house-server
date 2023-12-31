import { DataTypes, Model } from "sequelize";
import dtfPrintingOrder from "./order.js";

export default class dtfPrintingObject extends Model {}

export const dtfPrintingObjectInitter = (sequelize) => {
    dtfPrintingObject.init(
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
            url: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { sequelize, tableName: "dtf-object" }
    );
    return () => {
        dtfPrintingObject.hasMany(dtfPrintingOrder, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

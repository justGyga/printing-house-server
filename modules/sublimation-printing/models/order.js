import { DataTypes, Model } from "sequelize";
import SublimationPrintingObject from "./printing-object.js";

export default class SublimationOrder extends Model {}

export const sublimationOrderInitter = (sequelize) => {
    SublimationOrder.init(
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
        { sequelize, tableName: "sublimation-order" }
    );
    return () => {
        SublimationOrder.belongsTo(SublimationPrintingObject, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

import { DataTypes, Model } from "sequelize";
import SublimationPrintingObject from "./printing-object";

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
        { sequelize, updatedAt: false, tableName: "sublimation-order" }
    );
    return () => {
        SublimationOrder.hasMany(SublimationPrintingObject, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

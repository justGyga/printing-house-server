import { DataTypes, Model } from "sequelize";
import UltravioletOrder from "./order.js";

export default class UltravioletPrintingObject extends Model {}

export const ultravioletPrintingInitter = (sequelize) => {
    UltravioletPrintingObject.init(
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
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, tableName: "ultraviolet-object" }
    );
    return () => {
        UltravioletPrintingObject.hasMany(UltravioletOrder, { foreignKey: "objectId", onDelete: "CASCADE" });
    };
};

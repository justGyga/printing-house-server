import { DataTypes, Model } from "sequelize";

export default class LargeFormatPrintingObject extends Model {}

export const largeFormatPrintingObjectInitter = (sequelize) => {
    LargeFormatPrintingObject.init(
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
        { sequelize, tableName: "large-format-object" }
    );
    return () => {};
};

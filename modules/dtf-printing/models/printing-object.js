import { DataTypes, Model } from "sequelize";

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
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, updatedAt: false, tableName: "dtf-printing-object" }
    );
    return () => {};
};

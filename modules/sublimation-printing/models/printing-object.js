import { DataTypes, Model } from "sequelize";

export default class SublimationPrintingObject extends Model {}

export const sublimationPrintingInitter = (sequelize) => {
    SublimationPrintingObject.init(
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
        { sequelize,  tableName: "sublimation-printing-object" }
    );
    return () => {};
};

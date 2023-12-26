import { DataTypes, Model } from "sequelize";

export default class LaminationLargeFormat extends Model {}

export const laminationLargeFormatInitter = (sequelize) => {
    LaminationLargeFormat.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            frontSide: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            backSide: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            surface: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize,  tableName: "lamination-large-format" }
    );
    return () => {};
};

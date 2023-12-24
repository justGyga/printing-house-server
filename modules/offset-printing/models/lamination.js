import { DataTypes, Model } from "sequelize";

export default class LaminationOffset extends Model {}

export const laminationOffsetInitter = (sequelize) => {
    LaminationOffset.init(
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
        { sequelize, updatedAt: false, tableName: "lamination-offset" }
    );
    return () => {};
};
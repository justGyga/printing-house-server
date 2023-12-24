import { DataTypes, Model } from "sequelize";

export default class OffsetPolishOffset extends Model {}

export const offsetPolishOffsetInitter = (sequelize) => {
    OffsetPolishOffset.init(
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
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, updatedAt: false, tableName: "polish-order" }
    );
    return () => {};
};

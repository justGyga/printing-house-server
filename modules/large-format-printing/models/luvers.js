import { DataTypes, Model } from "sequelize";

export default class LuversOffset extends Model {}

export const luversOffsetInitter = (sequelize) => {
    LuversOffset.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            shape: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            distance: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, updatedAt: false, tableName: "luvers-large-format" }
    );
    return () => {};
};

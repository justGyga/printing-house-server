import { DataTypes, Model } from "sequelize";

export default class TechnicalOrder extends Model {}

export const technicalOrderInitter = (sequelize) => {
    TechnicalOrder.init(
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
            status: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            provider: {
                type: DataTypes.UUID,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, updatedAt: false, tableName: "technical-order" }
    );
    return () => {};
};

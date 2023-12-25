import { DataTypes, Model } from "sequelize";

export default class TempOrder extends Model {}

export const tempOrderInitter = (sequelize) => {
    TempOrder.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            catalogReference: {
                type: DataTypes.UUID,
                allowNull: true
            },
            circulation: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            date: {
                type: DataTypes.DATEONLY,
                defaultValue: new Date()
            }
        },
        { sequelize, updatedAt: false, tableName: "temp-order" }
    );
    return () => {};
};

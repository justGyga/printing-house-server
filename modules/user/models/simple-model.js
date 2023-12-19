import { DataTypes, Model } from "sequelize";

export default class SimpleModel extends Model {}

export const simpleModelInitter = (sequelize) => {
    SimpleModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, updatedAt: false, tableName: "simpleModel" }
    );
    return () => {};
};

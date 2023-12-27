import { DataTypes, Model } from "sequelize";

export default class Grommet extends Model {}

export const grommetInitter = (sequelize) => {
    Grommet.init(
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
                type: DataTypes.INTEGER,
                allowNull: false
            },
            distance: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, tableName: "large-format-grommet" }
    );
    return () => {};
};

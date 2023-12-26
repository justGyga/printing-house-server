import { DataTypes, Model } from "sequelize";

export default class GrommetOffset extends Model {}

export const grommetOffsetInitter = (sequelize) => {
    GrommetOffset.init(
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
        { sequelize,  tableName: "grommet-large-format" }
    );
    return () => {};
};

import { DataTypes, Model } from "sequelize";

export default class EmbossingOffset extends Model {}

export const embossingOffsetInitter = (sequelize) => {
    EmbossingOffset.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, updatedAt: false, tableName: "embossing-offset" }
    );
    return () => {};
};

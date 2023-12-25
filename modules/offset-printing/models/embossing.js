import { DataTypes, Model } from "sequelize";
import OffsetOrder from "./order.js";

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
    return () => {
        EmbossingOffset.belongsTo(OffsetOrder, { foreignKey: "embossingId", as: "embossing-offset-id", onDelete: "CASCADE" });
    };
};

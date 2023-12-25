import { DataTypes, Model } from "sequelize";
import OffsetOrder from "./order.js";

export default class PaperOffset extends Model {}

export const paperOffsetInitter = (sequelize) => {
    PaperOffset.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { sequelize, updatedAt: false, tableName: "paper-offset" }
    );
    return () => {
        PaperOffset.belongsTo(OffsetOrder, { foreignKey: "paperId", as: "paper-offset-id", onDelete: "CASCADE" });
    };
};

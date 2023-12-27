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
        { sequelize, tableName: "offset-paper" }
    );
    return () => {
        PaperOffset.belongsTo(OffsetOrder, { foreignKey: "orderId", onDelete: "CASCADE" });
    };
};

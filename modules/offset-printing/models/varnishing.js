import { DataTypes, Model } from "sequelize";
import OffsetOrder from "./order.js";

export default class VarnishingOffset extends Model {}

export const varnishingOffsetInitter = (sequelize) => {
    VarnishingOffset.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            frontSide: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            backSide: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            surface: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, tableName: "offset-varnishing" }
    );
    return () => {
        VarnishingOffset.belongsTo(OffsetOrder, { foreignKey: "orderId", as: "varnishing-offset", onDelete: "CASCADE" });
    };
};

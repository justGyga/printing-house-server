import { DataTypes, Model } from "sequelize";
import CuttingOffset from "./cutting.js";
import EmbossingOffset from "./embossing.js";
import LaminationOffset from "./lamination.js";
import OffsetPolishOffset from "./offset-polish.js";
import PaperOffset from "./paper.js";
import VarnishingOffset from "./varnishing.js";

export default class OffsetOrder extends Model {}

export const offsetOrderInitter = (sequelize) => {
    OffsetOrder.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            density: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            labelX: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            labelY: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            countPurchasedSheets: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            widthPurchasedSheets: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            heightPurchasedSheets: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            countColorsFront: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            countColorsBack: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { sequelize, tableName: "offset-order" }
    );
    return () => {
        OffsetOrder.hasMany(CuttingOffset, { foreignKey: "orderId", as: "cutting-offset", onDelete: "CASCADE" });
        OffsetOrder.hasMany(EmbossingOffset, { foreignKey: "orderId", as: "embossing-offset", onDelete: "CASCADE" });
        OffsetOrder.hasMany(LaminationOffset, { foreignKey: "orderId", as: "lamination-offset", onDelete: "CASCADE" });
        OffsetOrder.hasMany(OffsetPolishOffset, { foreignKey: "orderId", as: "polish-offset", onDelete: "CASCADE" });
        OffsetOrder.hasMany(PaperOffset, { foreignKey: "orderId", as: "paper-offset", onDelete: "CASCADE" });
        OffsetOrder.hasMany(VarnishingOffset, { foreignKey: "orderId", as: "varnishing-offset", onDelete: "CASCADE" });
    };
};

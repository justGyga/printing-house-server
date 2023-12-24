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
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            circulationMain: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            circulationAdditional: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            density: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            labelX: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            labelY: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            countPurchasedSheets: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            widthPurchasedSheets: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            heightPurchasedSheets: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            countColorsFront: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            countColorsBack: {
                type: DataTypes.INTEGER,
                defaultValue: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, updatedAt: false, tableName: "offset-order" }
    );
    return () => {
        OffsetOrder.hasOne(CuttingOffset, { foreignKey: "offsetOrderId", as: "cutting-offset-id", onDelete: "CASCADE" });
        OffsetOrder.hasOne(EmbossingOffset, { foreignKey: "offsetOrderId", as: "embossing-offset-id", onDelete: "CASCADE" });
        OffsetOrder.hasOne(LaminationOffset, { foreignKey: "offsetOrderId", as: "lamination-offset-id", onDelete: "CASCADE" });
        OffsetOrder.hasOne(OffsetPolishOffset, { foreignKey: "offsetOrderId", as: "offset-polish-offset-id", onDelete: "CASCADE" });
        OffsetOrder.hasOne(PaperOffset, { foreignKey: "offsetOrderId", as: "paper-offset-id", onDelete: "CASCADE" });
        OffsetOrder.hasOne(VarnishingOffset, { foreignKey: "offsetOrderId", as: "varnishing-offset-id", onDelete: "CASCADE" });
    };
};

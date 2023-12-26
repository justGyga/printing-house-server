import { DataTypes, Model } from "sequelize";
import GrommetOffset from "./grommet.js";
import LaminationLargeFormat from "./lamination.js";
import LargeFormatPrintingObject from "./printing-object.js";

export default class LargeFormatOrder extends Model {}

export const largeFormatOrderInitter = (sequelize) => {
    LargeFormatOrder.init(
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
        { sequelize, tableName: "large-format-order" }
    );
    return () => {
        LargeFormatOrder.hasMany(LargeFormatPrintingObject, { foreignKey: "objectId", onDelete: "CASCADE" });
        LargeFormatOrder.hasMany(GrommetOffset, { foreignKey: "luversId", onDelete: "CASCADE" });
        LargeFormatOrder.hasMany(LaminationLargeFormat, { foreignKey: "laminationId", onDelete: "CASCADE" });
    };
};

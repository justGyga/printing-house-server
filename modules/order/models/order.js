import { DataTypes, Model } from "sequelize";
import { ORDER_STATUS } from "../../commons/enums/order-status.js";
import { ORDER_TYPE } from "../../commons/enums/order-type.js";
import Organization from "../../organization/models/organization.js";

export default class Order extends Model {}

export const orderInitter = (sequelize) => {
    Order.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            circulationMain: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            circulationAdditional: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                validate: { isIn: [Object.values(ORDER_STATUS)] }
            },
            printingId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { isIn: [Object.values(ORDER_TYPE)] }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { sequelize, tableName: "printing-result-order" }
    );
    return () => {
        Order.belongsTo(Organization, { foreignKey: "organizationId", onDelete: "CASCADE" });
    };
};

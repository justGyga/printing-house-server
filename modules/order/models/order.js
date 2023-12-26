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
            circulationMain: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            circulationAdditional: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: new Date()
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { isIn: [Object.values(ORDER_STATUS)] }
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { isIn: [Object.values(ORDER_TYPE)] }
            }
        },
        { sequelize, tableName: "order" }
    );
    return () => {
        Order.belongsTo(Organization, { foreignKey: "organizationId", onDelete: "CASCADE" });
    };
};

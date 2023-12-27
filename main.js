import { Sequelize } from "sequelize";
import DatabaseAdapter from "./core/database/PG-adapter.js";
import Routing from "./core/routes.js";
import Server from "./core/server.js";
import printingHouseModels from "./modules/_database_models_initter.js";
import DTFRouter from "./modules/dtf-printing/router.js";
import OrderRouter from "./modules/order/router.js";
import OrganizationRouter from "./modules/organization/router.js";
import SublimationRouter from "./modules/sublimation-printing/router.js";
import UltraVioletRouter from "./modules/ultraviolet-printing/router.js";
import UserRouter from "./modules/user/router.js";

const APP_PORT = process.env.PORT || 7000;

new Server(APP_PORT, [
    new DatabaseAdapter(
        new Sequelize(process.env.DB_NAME, process.env.PG_USER, process.env.PG_PASS, {
            dialect: "postgres",
            host: process.env.PG_HOST || "127.0.0.1",
            port: process.env.PG_PORT || 5432,
            logging: false,
            query: { raw: true, nest: true },
            sync: { alter: true }
        })
    ).registerModels([...printingHouseModels]),
    new Routing([
        { prefix: "/user", router: UserRouter },
        { prefix: "/organization", router: OrganizationRouter },
        { prefix: "/order", router: OrderRouter },
        { prefix: "/dtf/object", router: DTFRouter },
        { prefix: "/ultraviolet/object", router: UltraVioletRouter },
        { prefix: "/sublimation/object", router: SublimationRouter }
    ])
])
    .initServices()
    .then((server) => server.run(() => console.log("Server started on port %s", APP_PORT)));

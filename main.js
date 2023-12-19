import { Sequelize } from "sequelize";
import DatabaseAdapter from "./core/database/PG-adapter.js";
import Routing from "./core/routes.js";
import Server from "./core/server.js";
import SwaggerDoc from "./core/swagger.js";
import printingHouseModels from "./modules/_database_models_initter.js";
import UserRouter from "./modules/user/router.js";

const APP_PORT = process.env.PORT || 7000;

new Server([
    // ! Мирон, это адаптер для постгры, делаешь на монге (реши что со стеком) - я дам тебе другой адаптер
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
    // ! Мирон, это для роутинга, оно надо
    new Routing([{ prefix: "/user", router: UserRouter }]),
    // ! Мирон, это для документации. Если тебе не надо - не прописывай new Swagger...
    new SwaggerDoc(
        {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "AIRPROMAP MASTER-API SERVER",
                    version: "1.0.0",
                    description: "The REST API documentation for AIRPROMAP-Master-Server.",
                    contact: {
                        name: "LeamSoftware",
                        url: "https://soft.leam.pro"
                    }
                },
                servers: [{ url: process.env.APP_DOMAIN }],
                components: {
                    securitySchemes: {
                        bearer: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
                    }
                },
                security: [{ bearer: [] }]
            },
            apis: ["./documents/**/*.yml", "./documents/**/*.yaml"]
        },
        { docExpansion: "none" }
    )
])
    .initServices()
    .then((server) => server.run(() => console.log("Server started on port %s", APP_PORT)));

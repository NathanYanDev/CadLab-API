import swaggerJSDoc from "swagger-jsdoc";
import { Schemas } from "../schemas/index";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CadLab API",
      version: "1.0.0",
      description: "API para gerenciar laboratórios, salas e agendamentos",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...Schemas,
      },
    },
    servers: [
      {
        url: "https://cadlab-api-c7dbcre5czgvbzcj.brazilsouth-01.azurewebsites.net",
        description: "Servidor de desenvolvimento",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

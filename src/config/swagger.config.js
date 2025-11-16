import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sorikyul API",
      version: "1.0.0",
      description: "소리결 API 문서",
    },
    servers: [
      { url: "http://localhost:3000", description: "개발 서버" },
      { url: "https://sorikyul.onrender.com", description: "운영 서버" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Access Token을 입력하세요. 예시: Bearer eyJhbGciOiJIUzI1NiIs...",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
          description: "Refresh Token (Swagger에서 쿠키 테스트 시 필요)",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
        cookieAuth: [],
      },
    ],
  },
  apis: [path.resolve(__dirname, "../swagger/*.js")], // 기존 JSDoc 문서 유지
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log('📄 Swagger UI: http://localhost:3000/api-docs');
  console.log('📄 Swagger UI: https://sorikyul.onrender.com/api-docs');
}
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";

async function bootstrap() {
  const proxyRoutes = createProxyMiddleware({
    target: "http://localhost:3001",
    pathRewrite: {
      "proxy/totalAttendanceService": "/totalAttendance",
      "proxy/riskFailService": "/riskFailure",
      "proxy/studentEngagementService": "/studentEngagement",
    },
    changeOrigin: true,
  });

  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.useGlobalPipes(new ValidationPipe());

  app.use(proxyRoutes);

  await app.listen(3002);
}
bootstrap();

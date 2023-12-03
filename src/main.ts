import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DiscoveryModule, ProxyModule, ReceiverModule } from "./app.module";

async function initialiseApp(module: any, port: number) {
  const app = await NestFactory.create(module, { bodyParser: false });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}

async function main() {
  await initialiseApp(DiscoveryModule, 3001);
  await initialiseApp(ProxyModule, 3002);
  await initialiseApp(ReceiverModule, 3003);
}

main();

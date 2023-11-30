import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ProxyController } from "./controllers/proxy.controller";
import { AppService } from "./app.service";

@Module({
  imports: [HttpModule],
  controllers: [ProxyController],
  providers: [AppService],
})
export class AppModule {}

// {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(TestMiddleware).forRoutes("*");
//   }
// }

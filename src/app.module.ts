import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ProxyController } from "./controllers/proxy.controller";
import { DiscoveryController } from "./controllers/discovery.controller";
import { DiscoveryService } from "./service/discovery.service";
import { ProxyService } from "./service/proxy.service";
import { ReceiverController } from "./controllers/receiver.controller";

@Module({
  imports: [HttpModule],
  controllers: [DiscoveryController],
  providers: [DiscoveryService, ProxyService],
})
export class DiscoveryModule {}

@Module({
  imports: [HttpModule],
  controllers: [ProxyController],
  providers: [DiscoveryService, ProxyService],
})
export class ProxyModule {}

@Module({
  imports: [HttpModule],
  controllers: [ReceiverController],
})
export class ReceiverModule {}

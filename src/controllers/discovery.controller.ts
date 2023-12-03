import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { DiscoveryService } from "../service/discovery.service";
import { Request, Response } from "express";

@Controller("discovery")
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {
    this.discoveryService = discoveryService;
  }

  @Post("register")
  register(@Req() req: Request, @Res() res: Response) {
    // TODO add service call to add endpoints to proxy service
    this.discoveryService.registerService(req);

    res.status(200);
    res.send();
  }

  @Post("unregister")
  unregister(@Req() req: Request, @Res() res: Response) {
    this.discoveryService.unregisterService(req);

    return res;
  }
}

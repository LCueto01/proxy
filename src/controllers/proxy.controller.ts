import { All, Controller, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ProxyService } from "../service/proxy.service";
import { Endpoint } from "../service/types";
import { HttpService } from "@nestjs/axios";
import { Method } from "axios";

@Controller("proxy")
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly httpService: HttpService
  ) {
    this.proxyService = proxyService;
    this.httpService = httpService;
  }

  @All("*")
  async proxyRequestHandler(
    @Req() request: Request,
    @Res() response: Response
  ) {
    const endpoint: Endpoint = {
      path: request.path,
      method: request.method as Method,
    };

    const service = this.proxyService.getServiceForEndpoint(endpoint);
    const url = service + endpoint.path;

    const proxyResponse = this.httpService.request({
      url,
      headers: request.headers,
      data: request.body,
    });

    response.status(200);
    await proxyResponse.forEach((res) => response.send(res));
  }
}

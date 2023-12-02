import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("receiver")
export class ReceiverController {
  // TODO add service initialisation function to reach out to discovery controller
  @Post("/post")
  async receiver(@Req() request: Request, @Res() response: Response) {
    console.log(request);
    response.status(200);
    response.send("Receipt of delivery.");
  }
}

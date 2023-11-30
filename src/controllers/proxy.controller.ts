import { Controller, Post, Req, Get } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Controller("proxy")
export class ProxyController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  healthCheck(): boolean {
    return true;
  }

  @Post("riskFailService")
  async forwardRiskFailure(): Promise<any> {}

  @Post("totalAttendanceService")
  async forwaredTotalAttendance(): Promise<any> {}

  @Post("studentEngagementService")
  forwaredStudentEngagement(@Req() failureMetrics: any): boolean {
    const { cutOff, engagementScore } = failureMetrics;

    return engagementScore < cutOff;
  }
}

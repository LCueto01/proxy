import { Injectable } from "@nestjs/common";
import { Endpoint, ServiceName } from "./types";

@Injectable()
export class ProxyService {
  private proxies: Map<Endpoint, ServiceName>;

  constructor() {
    this.proxies = new Map();
  }

  public getServiceForEndpoint(endpoint: Endpoint) {
    return this.proxies.get(endpoint);
  }

  public registerEndpoints(endpoints: Set<Endpoint>, serviceName: ServiceName) {
    endpoints.forEach((endpoint) => this.proxies.set(endpoint, serviceName));
  }

  public unregisterEndpoints(endpoint: Endpoint) {
    this.proxies.delete(endpoint);
  }
}

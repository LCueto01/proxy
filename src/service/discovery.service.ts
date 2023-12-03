import { Injectable } from "@nestjs/common";
import { Endpoint, ServiceName } from "./types";
import { Request } from "express";

const SERVICE_NAME_HEADER = "X-Service-Name";

class RoundRobinIterator {
  private readonly items: Set<string>;
  private currentIndex: number;

  constructor(items: Set<string>) {
    this.items = items;
    this.currentIndex = 0;
  }

  // Invoke when you need a host to forward the request to
  getNext() {
    const item = this.items[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.items.size;
    return item;
  }

  // Invoke when new host gets added to service
  addItem(item: string) {
    this.items.add(item);
  }

  // Invoke when host is no longer accessible
  removeItem(item: string) {
    this.items.delete(item);
  }
}

@Injectable()
export class DiscoveryService {
  private serviceMaps: Map<ServiceName, RoundRobinIterator>;
  private proxies: Map<Endpoint, ServiceName>;

  constructor() {
    this.serviceMaps = new Map();
    this.proxies = new Map();
  }

  public tester() {
    console.log(this.serviceMaps);
  }

  public registerService(request: Request) {
    if (request.header(SERVICE_NAME_HEADER)) {
      const serviceName = request.header(SERVICE_NAME_HEADER);
      const hostName = request.header("Host");

      if (this.serviceMaps.has(serviceName)) {
        this.serviceMaps.get(serviceName).addItem(hostName);
      } else {
        this.serviceMaps.set(
          serviceName,
          new RoundRobinIterator(new Set(hostName))
        );
      }
    }
  }

  public unregisterService(request: Request) {
    if (request.header(SERVICE_NAME_HEADER)) {
      const serviceName = request.header(SERVICE_NAME_HEADER);
      const hostName = request.header("Host");

      if (this.serviceMaps.has(serviceName)) {
        this.serviceMaps.get(serviceName).removeItem(hostName);
      }
    }
  }
}

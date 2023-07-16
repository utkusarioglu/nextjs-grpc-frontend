import { InflationClient } from "./gen/inflation/decade-stats.client";
import { grpcTransport } from "./transport";

export const inflationClient = new InflationClient(grpcTransport);

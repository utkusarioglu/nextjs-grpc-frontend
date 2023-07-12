import { InflationClient } from "./gen/src/inflation/decade-stats.client";
import { grpcTransport } from "./transport";

export const inflationClient = new InflationClient(grpcTransport);

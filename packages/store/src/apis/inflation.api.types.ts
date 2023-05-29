interface DecadeStats {
  countryName: string;
  countryCode: string;
  decade: number;
  count: number;
  average: number;
  max: number;
  min: number;
  median: number;
  range: number;
  stdDev: number;
  variance: number;
}
export interface DecadeStatsApiResponse {
  decadeStats: DecadeStats[];
}

import { type ResponsiveLoaderImage } from "../types/vendors/responsive-loader.types";

interface DecadeStatsApiResponseSuccess {
  status: "success";
  payload: DecadeStats[];
}

interface DecadeStatsApiResponseFailure {
  status: "failure";
  message: string;
}

export type DecadeStatsApiResponse =
  | DecadeStatsApiResponseSuccess
  | DecadeStatsApiResponseFailure;

interface DecadeStats {
  creator: {
    profileImage: ResponsiveLoaderImage;
  };
  stats: {
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
  };
}

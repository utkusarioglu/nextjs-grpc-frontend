import { inflationApi } from "app/src/api/inflation";

export default async function handler(_req, res) {
  const codes = ["TUR", "FRA", "USA"];
  const response = await inflationApi(codes);
  res.status(200).json(response);
}

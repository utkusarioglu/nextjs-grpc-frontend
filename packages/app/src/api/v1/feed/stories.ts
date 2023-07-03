import { MockData } from "../../../utils/mock-data.utils";

export async function storiesApi(offset: number, limit: number) {
  try {
    if (process.env.MOCK_ENDPOINTS === "true") {
      const payload = await MockData.stories(offset, limit);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: "success",
            payload,
          });
        }, +process.env.MOCK_LATENCY!);
      });
    }

    throw new Error("NOT_IMPLEMENTED");
  } catch (err) {
    console.log("storiesApi", { err });
    switch (err) {
      case "NOT_IMPLEMENTED":
        return {
          status: "failure",
          message: "Method not yet implemented",
        };

      default:
        console.log("Unknown error");
        return {
          status: "failure",
          message: "Generic error",
        };
    }
  }
}

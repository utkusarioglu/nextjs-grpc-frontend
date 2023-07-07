import type { ConfigFile } from "@rtk-query/codegen-openapi";
import { resolve } from "path";
// import { rmSync, mkdirSync } from "fs";

const codegenRoot = resolve(__dirname, "codegen");
const specsRoot = resolve(__dirname, "specs");
const rtkRoot = resolve(codegenRoot, "rtk");

// rmSync(codegenRoot, { recursive: true, force: true });
// mkdirSync(codegenRoot, { recursive: true });

// @ts-ignore: Bad type definition by the vendor
const config: ConfigFile = {
  schemaFile: resolve(specsRoot, "v1/schema.yaml"),
  outputFiles: {
    [resolve(rtkRoot, "auth.api.ts")]: {
      filterEndpoints: ["loginWithAuthId", "loginWithUserPass", "logout"],
      exportName: "authApi",
      apiFile: "./templates/auth.api.template.ts",
      apiImport: "apiTemplate",
    },
    [resolve(rtkRoot, "feed.api.ts")]: {
      filterEndpoints: ["fetchPosts", "fetchStories"],
      exportName: "feedApi",
      apiFile: "./templates/feed.api.template.ts",
      apiImport: "apiTemplate",
    },
    [resolve(rtkRoot, "inflation.api.ts")]: {
      filterEndpoints: ["fetchDecadeStats"],
      exportName: "inflationApi",
      apiFile: "./templates/inflation.api.template.ts",
      apiImport: "apiTemplate",
    },
  },

  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true,
  },
};

export default config;

export function register() {
  const enableInstrumentation = process.env.ENABLE_INSTRUMENTATION;
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    (!enableInstrumentation ||
      !["NO", "FALSE", "0"].includes(enableInstrumentation.toUpperCase()))
  ) {
    require("./telemetry.ts");
  } else {
    console.log(
      [
        "Skipping instrumentation initialization",
        "\n",
        `This is because \`env.ENABLE_INSTRUMENTATION\` is set as`,
        " ",
        enableInstrumentation,
      ].join("")
    );
  }
}

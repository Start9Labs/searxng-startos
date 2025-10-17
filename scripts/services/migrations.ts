import { compat, types as T } from "../deps.ts";

export const migration: T.ExpectedExports.migration =
  compat.migrations.fromMapping(
    {
      "2023.11.14": {
        up: compat.migrations.updateConfig(
          (config: any) => {
            config["tor-url"] = false;

            return config;
          },
          true,
          { version: "2023.11.14", type: "up" }
        ),
        down: compat.migrations.updateConfig(
          (config: any) => {
            delete config["tor-url"];

            return config;
          },
          true,
          { version: "2023.11.14", type: "down" }
        ),
      },
    },
    "2025.10.15"
  );

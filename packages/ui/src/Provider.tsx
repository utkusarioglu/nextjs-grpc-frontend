import type { FC, ReactNode } from "react";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "./tamagui.config";

type UiProviderProps = typeof TamaguiProvider & {
  children: ReactNode;
  config: typeof tamaguiConfig;
};

const UiProvider: FC<UiProviderProps> = ({ children, config, ...rest }) => {
  return (
    <TamaguiProvider config={config} {...rest}>
      {children}
    </TamaguiProvider>
  );
};

export default UiProvider;

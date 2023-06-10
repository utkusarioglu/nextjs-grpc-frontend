import type { FC, ReactNode } from "react";
import { TamaguiProvider, createTamagui } from "tamagui";

type UiProviderProps = typeof TamaguiProvider & {
  children: ReactNode;
  config: ReturnType<typeof createTamagui>;
};

const UiProvider: FC<UiProviderProps> = ({ children, config, ...rest }) => {
  return (
    <TamaguiProvider config={config} {...rest}>
      {children}
    </TamaguiProvider>
  );
};

export default UiProvider;

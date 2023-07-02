import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { type ReactNode, type FC } from "react";
import UiProvider from "ui/src/Provider";
import tamaguiConfig from "../../tamagui.config";

interface WebThemeProviderProps {
  children: ReactNode;
}

/**
 * @dev
 * #1 memo to avoid re-render on dark/light change
 * #2 because we do our custom getCSS() above, we disableInjectCSS here
 * #3 The component has some typing issues
 * #4 The component has some typing issues
 */
export const WebThemeProvider: FC<WebThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useRootTheme();
  return (
    /* @ts-ignore #3 */
    <NextThemeProvider onChangeTheme={setTheme}>
      <UiProvider
        config={tamaguiConfig}
        // @ts-ignore #4
        disableInjectCSS // #2
        disableRootThemeClass
        defaultTheme={theme}
      >
        {children}
      </UiProvider>
    </NextThemeProvider>
  );
};

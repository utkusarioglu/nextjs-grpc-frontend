import { useState, useEffect } from "react";
import { Stack } from "ui";
import { HeroLoadingLayout } from "../layouts/HeroLoading.layout";
import { CompactLanguageChangerView } from "../views/CompactLanguageChanger.view";
import { LoginOptionsView } from "../views/LoginOptions.view";
import { WelcomeScreenMottoView } from "../views/WelcomeScreenMotto.view";
import {
  selectIsAppInitialized,
  selectIsLoggedIn,
  useSelector,
  selectIsAuthChecksComplete,
} from "store";

const WelcomeScreen = () => {
  const [isComponentsEnabled, setIsComponentsEnabled] = useState(false);
  const isAppInitialized = useSelector(selectIsAppInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthChecksComplete = useSelector(selectIsAuthChecksComplete);

  const isInitializedGuest =
    isAppInitialized && isAuthChecksComplete && !isLoggedIn;

  useEffect(() => {
    if (isInitializedGuest) {
      setTimeout(() => {
        setIsComponentsEnabled(true);
      }, 1000);
    }
  }, [isInitializedGuest]);

  return (
    <HeroLoadingLayout
      {...(isComponentsEnabled && {
        topComponent: (
          <Stack
            animation="slow"
            enterStyle={{ opacity: 0 }}
            opacity={1}
            alignItems="flex-end"
            position="absolute"
            top="$4"
            right="$4"
            left="$4"
          >
            <CompactLanguageChangerView />
          </Stack>
        ),
        mottoComponent: <WelcomeScreenMottoView />,
        bottomComponent: (
          <Stack
            animation="slow"
            position="absolute"
            enterStyle={{ opacity: 0 }}
            opacity={1}
            bottom={0}
            left={0}
            right={0}
            padding="$4"
          >
            <LoginOptionsView />
          </Stack>
        ),
      })}
    />
  );
};

export default WelcomeScreen;

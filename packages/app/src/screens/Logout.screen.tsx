import { Paragraph, YStack, H1 } from "ui";
import { useTranslation } from "i18n";
import { useLogout } from "../hooks/auth.hooks";
import { ErrorBoundary } from "react-error-boundary";
import { ScreenFallback } from "../fallbacks/Screen.fallback";

const LogoutScreen = () => {
  const { isLoading } = useLogout();
  const { t } = useTranslation(["rest"]);

  const MessageComponent = isLoading ? (
    <Paragraph>{t`rest:LogoutScreen.LoggingOut`}</Paragraph>
  ) : (
    <Paragraph>{t`rest:LogoutScreen.Redirecting`}</Paragraph>
  );

  return (
    <ErrorBoundary FallbackComponent={ScreenFallback}>
      <YStack
        padding="$4"
        fullscreen
        alignItems="center"
        justifyContent="center"
      >
        <H1>{t`rest:LogoutScreen.Logout`}</H1>
        {MessageComponent}
      </YStack>
    </ErrorBoundary>
  );
};

export default LogoutScreen;

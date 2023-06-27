import { Paragraph, YStack, H1 } from "ui";
import { useTranslation } from "i18n";
import { useLogout } from "../hooks/auth.hooks";

const LogoutScreen = () => {
  const { isLoading } = useLogout();
  const { t } = useTranslation(["rest"]);

  const MessageComponent = isLoading ? (
    <Paragraph>{t`rest:LogoutScreen.LoggingOut`}</Paragraph>
  ) : (
    <Paragraph>{t`rest:LogoutScreen.Redirecting`}</Paragraph>
  );

  return (
    <YStack padding="$4" fullscreen alignItems="center" justifyContent="center">
      <H1>{t`rest:LogoutScreen.Logout`}</H1>
      {MessageComponent}
    </YStack>
  );
};

export default LogoutScreen;

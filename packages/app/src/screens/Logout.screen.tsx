import { Paragraph, YStack, H1 } from "ui";
import { useLogout } from "../hooks/auth.hooks";

const LogoutScreen = () => {
  const { isLoading } = useLogout();

  const MessageComponent = isLoading ? (
    <Paragraph>Logging out…</Paragraph>
  ) : (
    <Paragraph>Redirecting…</Paragraph>
  );

  return (
    <YStack padding="$4" fullscreen alignItems="center" justifyContent="center">
      <H1>Logout</H1>
      {MessageComponent}
    </YStack>
  );
};

export default LogoutScreen;

import { Paragraph, YStack } from "ui";
import { useLogout } from "../hooks/auth.hooks";

const LogoutScreen = () => {
  const { isLoading } = useLogout();

  if (isLoading) {
    <YStack padding="$4">
      <Paragraph>Logging out...</Paragraph>
    </YStack>;
  }

  return (
    <YStack padding="$4">
      <Paragraph>Redirecting...</Paragraph>
    </YStack>
  );
};

export default LogoutScreen;

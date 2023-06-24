import { useRouter } from "solito/router";
import { YStack, Button, Spacer } from "ui";

const SettingsScreen = () => {
  const { push, back } = useRouter();
  return (
    <YStack padding="$4">
      <Button onPress={() => back()}>Back</Button>
      <Spacer />
      <Button
        onPress={() =>
          push({
            pathname: "/logout",
          })
        }
      >
        Logout
      </Button>
    </YStack>
  );
};

export default SettingsScreen;

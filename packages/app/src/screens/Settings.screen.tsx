import { useRouter } from "solito/router";
import { YStack, Button } from "ui";

const SettingsScreen = () => {
  const { push } = useRouter();
  return (
    <YStack padding="$4">
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

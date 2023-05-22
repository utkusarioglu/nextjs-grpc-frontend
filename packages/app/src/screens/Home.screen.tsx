import CustomButton from "ui/src/CustomButton";
import CustomHeader from "ui/src/CustomHeader";
import CustomInput from "ui/src/CustomInput";
import { useRouter } from "solito/router";
import { Spacer, YStack, XStack, Button } from "ui";

const HomeScreen = () => {
  const { push } = useRouter();
  return (
    <YStack>
      <CustomHeader>Hi Hello Howdy!</CustomHeader>
      <CustomInput />
      <Spacer />
      <XStack>
        <CustomButton userId={1}>One</CustomButton>
        <Spacer />
        <CustomButton userId={2}>Two</CustomButton>
        <Spacer />
        <CustomButton userId={3}>Three</CustomButton>
      </XStack>
      <Spacer />
      <Button
        onPress={() =>
          push({
            pathname: "/decade-stats",
          })
        }
      >
        Decade Stats
      </Button>
    </YStack>
  );
};

export default HomeScreen;

import CustomButton from "ui/src/CustomButton";
import CustomHeader from "ui/src/CustomHeader";
import CustomInput from "ui/src/CustomInput";
import { useRouter } from "solito/router";
import { Spacer, YStack, XStack, Button, Icons, Paragraph } from "ui";

const HomeScreen = () => {
  const { push } = useRouter();

  return (
    <YStack padding="$4">
      <XStack
        justifyContent="space-between"
        marginBottom="$6"
        alignItems="center"
      >
        <CustomHeader>Howdy!</CustomHeader>
        <Button
          onPress={() =>
            push({
              pathname: "/settings",
            })
          }
        >
          <Paragraph>S</Paragraph>
          {/* <Icons.Settings /> */}
        </Button>
      </XStack>
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
    </YStack>
  );
};

export default HomeScreen;

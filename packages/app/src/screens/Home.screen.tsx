import CustomButton from "ui/src/CustomButton";
import CustomHeader from "ui/src/CustomHeader";
import CustomInput from "ui/src/CustomInput";
import { Spacer, YStack, XStack } from "ui";

const HomeScreen = () => {
  return (
    <YStack>
      <CustomHeader>Hi Hello Howdy</CustomHeader>
      <CustomInput />
      <Spacer />
      <XStack>
        <CustomButton userId={1}>One</CustomButton>
        <Spacer />
        <CustomButton userId={2}>Two</CustomButton>
        <Spacer />
        <CustomButton userId={3}>Three</CustomButton>
      </XStack>
    </YStack>
  );
};

export default HomeScreen;

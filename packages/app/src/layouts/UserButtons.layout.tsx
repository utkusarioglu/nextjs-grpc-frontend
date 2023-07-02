import CustomButton from "ui/src/CustomButton";
import { Spacer, XStack } from "ui";

const UserButtonsLayout = () => {
  return (
    <XStack paddingLeft="$4" paddingRight="$4" justifyContent="space-evenly">
      <CustomButton userId={1} flex={1}>
        One
      </CustomButton>
      <Spacer />
      <CustomButton userId={2} flex={1}>
        Two
      </CustomButton>
      <Spacer />
      <CustomButton userId={3} flex={1}>
        Three
      </CustomButton>
    </XStack>
  );
};

export default UserButtonsLayout;

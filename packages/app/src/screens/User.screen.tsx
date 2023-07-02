import CustomHeader from "ui/src/CustomHeader";
import { YStack, Text, Button, Spacer, Stack } from "ui";
import { createParam } from "solito";
import { useRouter } from "solito/router";
import { ScreenHeaderLayout } from "../layouts/ScreenHeader.layout";

type RouteParams = {
  userId: number;
};

const { useParam } = createParam<RouteParams>();

const CustomComponent = () => {
  const { push } = useRouter();
  const [userId] = useParam("userId", {
    initial: 0,
    parse: (v) => (!v ? -1 : +v),
  });
  return (
    <YStack>
      <ScreenHeaderLayout title="User" />
      <Spacer />
      <Stack paddingLeft="$4" paddingRight="$4">
        <Text>User id is: {userId}</Text>
        <Spacer />
        <Button onPress={() => push("/")}>Home</Button>
        <Spacer />
        <Button onPress={() => push("/user/4")}>4</Button>
      </Stack>
    </YStack>
  );
};

export default CustomComponent;

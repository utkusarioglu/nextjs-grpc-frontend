import CustomHeader from "ui/src/CustomHeader";
import { YStack, Text, Button, Spacer } from "ui";
import { createParam } from "solito";
import { useRouter } from "solito/router";

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
      <CustomHeader>Users</CustomHeader>
      <Text>User id is: {userId}</Text>
      <Button onPress={() => push("/")}>Home</Button>
      <Spacer />
      <Button onPress={() => push("/user/4")}>4</Button>
    </YStack>
  );
};

export default CustomComponent;

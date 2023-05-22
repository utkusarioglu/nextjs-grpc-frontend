import CustomButton from "ui/src/CustomButton";
import CustomHeader from "ui/src/CustomHeader";
import CustomInput from "ui/src/CustomInput";
import { useRouter } from "solito/router";
import { Spacer, YStack, XStack, Button, Text } from "ui";
import {
  useDispatch,
  useSelector,
  selectCount,
  increment,
  decrement,
} from "store/src/index";

const HomeScreen = () => {
  const { push } = useRouter();
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

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
      <Spacer />
      <YStack>
        <Button
          // aria-label="Increment value"
          onPress={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Text>Count: {count}</Text>
        <Button
          // aria-label="Decrement value"
          onPress={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </YStack>
    </YStack>
  );
};

export default HomeScreen;

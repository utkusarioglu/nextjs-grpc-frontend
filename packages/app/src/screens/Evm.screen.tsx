import { YStack, H1, Paragraph, Button } from "ui";
import { useRouter } from "solito/router";

const EvmScreen = () => {
  const { back } = useRouter();

  return (
    <YStack fullscreen>
      <YStack
        flexGrow={1}
        padding="$4"
        alignItems="center"
        justifyContent="center"
      >
        <H1>Evm</H1>
        <Paragraph>Login with evm identity</Paragraph>
      </YStack>
      <YStack padding="$4">
        <Button onPress={() => back()}>Try another method</Button>
      </YStack>
    </YStack>
  );
};

export default EvmScreen;

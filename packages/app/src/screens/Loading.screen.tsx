import { H1, Paragraph, YStack, Button } from "ui";
// import { useRouter } from "solito/router";

const LoadingScreen = () => {
  // const { push } = useRouter();

  return (
    <YStack padding="$4" fullscreen>
      <YStack flexGrow={1} alignItems="center" justifyContent="center">
        <H1>NextJS gRPC</H1>
        <Paragraph>
          This is a technical project with no predetermined use case
        </Paragraph>
      </YStack>
      {/* <YStack space>
        <Button onPress={() => push({ pathname: "/login" })}>
          Login with Userpass
        </Button>
        <Button onPress={() => push({ pathname: "/evm" })}>
          Login EVM identity
        </Button>
      </YStack> */}
    </YStack>
  );
};

export default LoadingScreen;

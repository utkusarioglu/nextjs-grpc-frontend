import { H1, Paragraph, YStack, Button } from "ui";
import { useRouter } from "solito/router";
import { useTranslation } from "i18n";

const WelcomeScreen = () => {
  const { push } = useRouter();
  const { t } = useTranslation();

  return (
    <YStack padding="$4" fullscreen>
      <YStack flexGrow={1} alignItems="center" justifyContent="center">
        <H1>NextJS gRPC</H1>
        <Paragraph>
          {t("main.header")}
          This is a technical project with no predetermined use case
        </Paragraph>
      </YStack>

      <YStack
        space
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        padding="$4"
      >
        <Button onPress={() => push({ pathname: "/login" })}>
          Login with Userpass
        </Button>
        <Button onPress={() => push({ pathname: "/evm" })}>
          Login EVM identity
        </Button>
      </YStack>
    </YStack>
  );
};

export default WelcomeScreen;

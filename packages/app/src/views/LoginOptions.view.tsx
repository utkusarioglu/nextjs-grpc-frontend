import { YStack, Button } from "ui";
import { useRouter } from "solito/router";
import { useTranslation } from "i18n";

export const LoginOptionsView = () => {
  const { push } = useRouter();
  const { t } = useTranslation(["guest"]);

  return (
    <YStack space="$2">
      <Button onPress={() => push({ pathname: "/sign-up" })}>Sign Up</Button>
      <Button onPress={() => push({ pathname: "/evm" })}>
        {t`guest:WelcomeScreen.Login.WithEvmIdentity`}
      </Button>
    </YStack>
  );
};

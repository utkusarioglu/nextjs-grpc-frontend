import { useRouter } from "solito/router";
import { YStack, Button, Spacer, H3, YGroup, Separator } from "ui";
import { useTranslation, LANGUAGES } from "i18n";

const SettingsScreen = () => {
  const { push, back } = useRouter();
  const { t, i18n } = useTranslation(["rest"]);

  return (
    <YStack padding="$4">
      <Button onPress={() => back()}>{t("global:Prompts.Back")}</Button>
      <Spacer />

      <H3>{t`rest:SettingsScreen.LanguageOptions.Title`}</H3>
      <Spacer size="$4" />
      <YGroup separator={<Separator />}>
        {LANGUAGES.map(({ label, code }) => (
          <YGroup.Item key={label}>
            <Button onPress={() => i18n.changeLanguage(code)}>{label}</Button>
          </YGroup.Item>
        ))}
      </YGroup>
      <Spacer size="$6" />

      <H3>{t`rest:SettingsScreen.AccountManagement.Title`}</H3>
      <Spacer size="$4" />
      <Button
        onPress={() =>
          push({
            pathname: "/logout",
          })
        }
      >
        {t`rest:SettingsScreen.Logout`}
      </Button>
    </YStack>
  );
};

export default SettingsScreen;

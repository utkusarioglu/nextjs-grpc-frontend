import { useRouter } from "solito/router";
import { YStack, Button, Spacer, H3, YGroup, Separator } from "ui";
import { useTranslation } from "i18n";

const LANGUAGES = [
  {
    label: "English",
    code: "en",
  },
  {
    label: "Turkish",
    code: "tr",
  },
];

const SettingsScreen = () => {
  const { push, back } = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <YStack padding="$4">
      <Button onPress={() => back()}>{t("general.back")}</Button>
      <Spacer />
      <H3>{t("settings.language_options")}</H3>
      <Spacer size="$4" />
      <YGroup separator={<Separator />}>
        {LANGUAGES.map(({ label, code }) => (
          <YGroup.Item>
            <Button onPress={() => i18n.changeLanguage(code)}>{label}</Button>
          </YGroup.Item>
        ))}
      </YGroup>
      <Spacer size="$6" />
      <H3>{t("settings.account_management")}</H3>
      <Spacer size="$4" />
      <Button
        onPress={() =>
          push({
            pathname: "/logout",
          })
        }
      >
        {t("settings.logout")}
      </Button>
    </YStack>
  );
};

export default SettingsScreen;

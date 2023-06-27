import { Button, XGroup } from "ui";
import { useTranslation, LANGUAGES } from "i18n";

export const CompactLanguageChangerView = () => {
  const { i18n } = useTranslation();
  return (
    <XGroup>
      {LANGUAGES.map(({ label, code }) => (
        <XGroup.Item key={label}>
          <Button onPress={() => i18n.changeLanguage(code)}>{label}</Button>
        </XGroup.Item>
      ))}
    </XGroup>
  );
};

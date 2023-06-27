import { Paragraph } from "ui";
import { useTranslation } from "i18n";

export const WelcomeScreenMottoView = () => {
  const { t } = useTranslation(["guest"]);

  return (
    <Paragraph
      animation="slow"
      enterStyle={{ opacity: 0 }}
      textAlign="center"
    >{t`guest:WelcomeScreen.Motto`}</Paragraph>
  );
};

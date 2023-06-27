import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";
import { createWebConfig } from "i18n";
import { loadTranslations } from "ni18n";
import LanguageDetector from "i18next-browser-languagedetector";

interface StandardGetServerSidePropsProps {
  i18n: {
    namespaces: string[];
  };
}

export function standardGetServerSideProps({
  i18n: { namespaces },
}: StandardGetServerSidePropsProps) {
  return wrapper.getServerSideProps((store) => {
    return async (props) => {
      const translations = await loadTranslations(
        createWebConfig({ use: [LanguageDetector] }),
        props.locale,
        namespaces
      );
      const possibleRedirect = await routeProtector({ store, props });

      return {
        ...possibleRedirect,
        props: {
          ...translations,
        },
      };
    };
  });
}

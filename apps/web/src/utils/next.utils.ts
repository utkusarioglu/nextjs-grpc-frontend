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
  console.log("gss called");
  return wrapper.getServerSideProps((store) => {
    console.log("wrapper called");
    return async (props) => {
      console.log("async called");
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

export function getSearchParam<P>(url: string, paramName: keyof P): string {
  const searchParamsStr = url.split("?")[1] || "";
  const searchParams = new URLSearchParams(searchParamsStr);
  const offset = searchParams.get(paramName.toString());
  return offset;
}

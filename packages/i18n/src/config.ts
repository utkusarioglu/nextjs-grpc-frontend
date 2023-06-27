const commonConfig = {
  debug: ["TRUE", "ENABLED", "1"].includes(
    (process.env.I18N_DEBUG_ENABLED || "").toUpperCase()
  ),
  react: {
    useSuspense: true,
  },
  ns: ["global"],
  supportedLngs: ["en", "tr"],
  fallbackLng: "en",
};

interface CreateWebConfigProps {
  use: any[];
}

export const createWebConfig = ({ use }: CreateWebConfigProps) => ({
  ...commonConfig,
  use,
});

export const rnConfig = {
  ...commonConfig,
  compatibilityJSON: "v3" as "v3",
  backend: {
    loadPath: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/locales/{{lng}}/{{ns}}.json`,
  },
};

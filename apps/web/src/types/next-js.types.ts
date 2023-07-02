// import type dynamic from "next/dynamic";
import { type NextPage } from "next";
import { AppProps } from "next/app";
import { type ReactElement, type ReactNode, type FC } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // getLayout?: (page: ReactElement) => ReactNode;
  // getLazyLayout?: Parameters<typeof dynamic>[0];
  getLayout?: FC<{ children: ReactElement }>;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

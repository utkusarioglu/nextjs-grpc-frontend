import { type NextPageWithLayout } from "src/types/next-js.types";
import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { ComponentType, Suspense, type ReactElement, type FC } from "react";
import { standardGetServerSideProps } from "src/utils/next.utils";

interface NextStandardHocProps {
  screen: Parameters<typeof dynamic>[0];
  // layout?: Parameters<typeof dynamic>[0];
  i18n?: { namespaces?: string[] };
  Layout?: FC<LayoutProps>;
}

interface LayoutProps {
  children: ReactElement;
}

interface WithGss {
  getServerSideProps: GetServerSideProps;
}

type ComponentTypeWithGss = ComponentType<unknown> & WithGss;

export function NextStandardHoc({
  screen,
  // layout,
  i18n,
  Layout,
}: NextStandardHocProps) {
  const LazyScreen = dynamic(screen) as ComponentTypeWithGss;

  const PageWrapper = () => <LazyScreen />;

  (LazyScreen as ComponentTypeWithGss).getServerSideProps =
    standardGetServerSideProps({
      i18n: { namespaces: i18n?.namespaces || ["global"] },
    });

  if (Layout) {
    (PageWrapper as NextPageWithLayout).getLayout = Layout;
  }

  return PageWrapper;
}

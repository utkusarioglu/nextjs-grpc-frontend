import { type FC, type ReactNode } from "react";
import { H1, Paragraph, YStack, Stack } from "ui";
import { TITLE } from "../constants";

interface HeroLoadingLayoutProps {
  mottoComponent?: ReactNode;
  bottomComponent?: ReactNode;
  topComponent?: ReactNode;
}

export const HeroLoadingLayout: FC<HeroLoadingLayoutProps> = ({
  bottomComponent = null,
  topComponent = null,
  mottoComponent = null,
}) => {
  return (
    <YStack padding="$4" fullscreen>
      <YStack flexGrow={1} alignItems="center" justifyContent="flex-end">
        <H1>{TITLE}</H1>
      </YStack>
      <Stack flexGrow={2} alignItems="center" justifyContent="flex-start">
        <Stack minHeight="$8">{mottoComponent}</Stack>
      </Stack>

      {topComponent}
      {bottomComponent}
    </YStack>
  );
};

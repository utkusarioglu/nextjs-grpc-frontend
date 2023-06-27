import { type FC } from "react";
import { Button, Paragraph, YStack, Spacer, H3 } from "ui";
import { type FallbackProps } from "react-error-boundary";

export const ScreenFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <YStack fullscreen justifyContent="center" alignItems="center">
      <H3>Screen Fallback</H3>
      <Spacer />
      <Paragraph>Error Message:</Paragraph>
      <Paragraph style={{ color: "red" }}>{error.message}</Paragraph>
      <Spacer />
      <Button onPress={resetErrorBoundary}>Reset Boundary</Button>
    </YStack>
  );
};

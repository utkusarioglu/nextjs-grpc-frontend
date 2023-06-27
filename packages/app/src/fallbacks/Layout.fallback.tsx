import { type FC } from "react";
import { Button, Paragraph, YStack, Spacer, H3, SizableText } from "ui";
import { type FallbackProps } from "react-error-boundary";

export const LayoutFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <YStack>
      <H3 textAlign="center">Layout Fallback</H3>
      <Paragraph style={{ color: "red" }} textAlign="center">
        {error.message}
      </Paragraph>
      <Button onPress={resetErrorBoundary}>
        <SizableText>Reset Boundary</SizableText>
      </Button>
    </YStack>
  );
};

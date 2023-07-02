import { Stack, Button, SizableText } from "ui";
import { useErrorBoundary } from "react-error-boundary";

export const ErrorThrowingView = () => {
  const { showBoundary } = useErrorBoundary();

  return (
    <Stack paddingLeft="$4" paddingRight="$4">
      <Button
        onPress={() => {
          showBoundary(
            new Error(`Custom error: ${Math.random().toString().slice(-4)}`)
          );
        }}
      >
        <SizableText>Trigger error</SizableText>
      </Button>
    </Stack>
  );
};

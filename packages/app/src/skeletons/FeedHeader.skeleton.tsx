import { XStack, Stack } from "ui";

export const FeedHeaderSkeleton = () => {
  return (
    <XStack
      justifyContent="space-between"
      marginBottom="$6"
      alignItems="center"
      paddingLeft="$4"
      paddingRight="$4"
      space="$6"
    >
      <Stack
        backgroundColor="$color5"
        height="$5"
        flexGrow={2}
        borderRadius="$4"
      />
      <Stack
        backgroundColor="$color5"
        height="$5"
        width={122}
        borderRadius="$4"
      />
    </XStack>
  );
};

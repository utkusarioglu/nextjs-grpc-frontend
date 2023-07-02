import { Spacer, Stack, YStack, Card, XStack, Icons, Circle } from "ui";

export const ImageListSkeleton = () => {
  return (
    <YStack space="$4">
      {Array(2)
        .fill(null)
        .map((_, i) => (
          <Card key={i} paddingBottom="$4" backgroundColor="$color4">
            <XStack
              space="$2"
              alignItems="center"
              position="absolute"
              top="$4"
              left="$4"
              right="$4"
              zIndex={1}
            >
              <Circle circular size="$2" backgroundColor="$color6" />
              <Stack
                height="$1"
                borderRadius="$4"
                width={150}
                backgroundColor="$color6"
              />
              <Stack
                height="$1"
                borderRadius="$4"
                width={50}
                backgroundColor="$color6"
              />
            </XStack>
            <Stack
              height={300}
              key={i}
              borderRadius="$4"
              overflow="hidden"
              backgroundColor="$color5"
            />
            <Spacer />
            <YStack paddingLeft="$4" paddingRight="$4">
              <XStack justifyContent="space-between" alignItems="center">
                <Stack
                  height="$2"
                  width={200}
                  backgroundColor="$color6"
                  borderRadius="$4"
                />
                <Icons.Heart color="$color6" />
              </XStack>
              <Spacer size="$3" />

              <Stack height="$1" backgroundColor="$color6" borderRadius="$4" />
              <Spacer size="$2" />
              <Stack height="$1" backgroundColor="$color6" borderRadius="$4" />
              <Spacer size="$2" />
              <Stack height="$1" backgroundColor="$color6" borderRadius="$4" />
            </YStack>
          </Card>
        ))}
    </YStack>
  );
};

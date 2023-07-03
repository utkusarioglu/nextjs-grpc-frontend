import { XStack, Card, H6, Avatar, Stack, Circle } from "ui";

const StoryCardSkeleton = () => (
  <Card
    width={100}
    height={150}
    borderRadius="$4"
    overflow="hidden"
    backgroundColor="$color5"
  >
    <Circle
      size="$2"
      position="absolute"
      top="$2"
      left="$2"
      backgroundColor="$color6"
    />
    <Card.Header position="absolute" bottom="$2" left="$2" right="$2">
      <Stack height="$1" backgroundColor="$color6" borderRadius="$4" />
    </Card.Header>
  </Card>
);

export const StoriesListSkeleton = () => {
  return (
    <XStack>
      <XStack paddingLeft="$4" paddingRight="$4" space="$2" overflow="hidden">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <StoryCardSkeleton key={i} />
          ))}
      </XStack>
    </XStack>
  );
};

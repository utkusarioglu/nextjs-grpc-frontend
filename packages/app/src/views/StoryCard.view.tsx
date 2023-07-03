import { type FC } from "react";
import { SolitoImage } from "solito/image";
import { Card, H6, Avatar } from "ui";
import { selectImageUrl } from "../utils/image.utils";
import type { useStories } from "store/src/apis/feed/feed.api";
import { CARD_WIDTH, CARD_HEIGHT } from "../layouts/StoriesList.layout";

// type Story = NonNullable<ReturnType<typeof useStories>["data"]>[0];

interface StoryCardProps {
  story: any; // TODO
}

export const StoryCardView: FC<StoryCardProps> = ({
  story: {
    creator: { profileImage, username },
    content: {
      media: { content, altText },
    },
  },
}) => {
  return (
    <Card
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      borderRadius="$4"
      overflow="hidden"
    >
      <Card.Background>
        {/* @ts-ignore */}
        <SolitoImage
          src={selectImageUrl(content.images, CARD_WIDTH, CARD_HEIGHT, true)}
          fill
          resizeMode="cover"
          alt={altText}
          placeholder="blur"
          blurDataURL={content.placeholder}
        />
      </Card.Background>
      <Avatar circular size="$2" position="absolute" top="$2" left="$2">
        <Avatar.Image src={selectImageUrl(profileImage.images, 30, 30, true)} />
        <Avatar.Fallback
          // @ts-ignore #1
          bc="$color6"
        />
      </Avatar>
      <Card.Header position="absolute" bottom="$2" left="$2" right="$2">
        <H6>{username}</H6>
      </Card.Header>
    </Card>
  );
};

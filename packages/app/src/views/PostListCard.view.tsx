import { type FC } from "react";
import { SolitoImage } from "solito/image";
import {
  Circle,
  Spacer,
  Stack,
  YStack,
  Card,
  H4,
  Paragraph,
  XStack,
  Avatar,
  Icons,
  ScrollView,
  useWindowDimensions,
} from "ui";
import { selectImageUrl } from "../utils/image.utils";

interface PostListCardContentMediaImage {
  type: "image";
  // contentUrl: string;
  content: any; // TODO
  altText: string;
}

interface PostListCardViewProps {
  post: any; // TODO
}

const POST_IMG_HEIGHT = 300;

export const PostListCardView: FC<PostListCardViewProps> = ({
  post: {
    creator: { profileImage, username },
    interaction: { isLiked },
    content: { media, date, header, body },
  },
}) => {
  const { height, scale, width } = useWindowDimensions();

  return (
    <Card
      paddingBottom="$4"
      backgroundColor="$color4"
      shadowColor="black"
      shadowRadius="$2"
      shadowOpacity={0.5}
    >
      <XStack
        space="$2"
        alignItems="center"
        position="absolute"
        top="$4"
        left="$4"
        right="$4"
        zIndex={1}
      >
        <Avatar circular size="$2" shadowColor="black" shadowRadius={3}>
          <Avatar.Image
            src={selectImageUrl(profileImage.images, 30, 30, true)}
          />
          <Avatar.Fallback
            // @ts-ignore #1
            bc="$color6"
          />
        </Avatar>
        <Paragraph margin={0} textShadowColor="black" textShadowRadius={5}>
          {username}
        </Paragraph>
        <Paragraph
          margin={0}
          opacity={0.8}
          textShadowColor="black"
          textShadowRadius={5}
        >
          5{date}
        </Paragraph>
      </XStack>
      <Stack
        borderRadius="$4"
        shadowColor="$color2"
        shadowRadius="$2"
        shadowOpacity={0.5}
      >
        <ScrollView horizontal>
          {
            // @ts-ignore
            media.map((medium, i) => (
              <PostCardMedia key={i} screenWidth={width} medium={medium} />
            ))
          }
        </ScrollView>

        {media.length > 1 ? (
          <Circle
            position="absolute"
            left="$4"
            bottom="$2"
            size="$3"
            backgroundColor="$color5"
          >
            <Paragraph>{media.length}</Paragraph>
          </Circle>
        ) : null}
      </Stack>
      <Spacer />
      <YStack paddingLeft="$4" paddingRight="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <Card.Header>
            <H4>{header}</H4>
          </Card.Header>
          <Icons.Heart color={isLiked ? "green" : "white"} />
        </XStack>
        <Spacer size="$2" />
        <Paragraph>{body}</Paragraph>
      </YStack>
    </Card>
  );
};

interface PostCardMediaProps {
  screenWidth: number;
  medium: PostListCardContentMediaImage;
}

const PostCardMedia: FC<PostCardMediaProps> = ({
  medium: { type, content, altText },
  screenWidth,
}) => {
  return (
    <Stack height={POST_IMG_HEIGHT} width={screenWidth} overflow="hidden">
      {/* @ts-ignore */}
      <SolitoImage
        src={selectImageUrl(content.images, screenWidth, POST_IMG_HEIGHT, true)}
        // sizes={content.sizes}
        fill
        resizeMode="cover"
        alt={altText}
        placeholder="blur"
        blurDataURL={content.placeholder}
      />
    </Stack>
  );
};

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

interface PostListCardContentMediaImage {
  type: "image";
  contentUrl: string;
  altText: string;
}

interface PostListCardViewProps {
  post: {
    creator: {
      profileImageUrl: string;
      username: string;
    };
    interaction: {
      isLiked: boolean;
    };
    content: {
      media: PostListCardContentMediaImage[];
      date: string;
      header: string;
      body: string;
    };
  };
}

export const PostListCardView: FC<PostListCardViewProps> = ({
  post: {
    creator: { profileImageUrl, username },
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
          <Avatar.Image src={profileImageUrl} />
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
          {date}
        </Paragraph>
      </XStack>
      <Stack
        borderRadius="$4"
        shadowColor="$color2"
        shadowRadius="$2"
        shadowOpacity={0.5}
      >
        <ScrollView horizontal>
          {media.map(({ type, contentUrl, altText }) => (
            <Stack
              height={300}
              width={width}
              overflow="hidden"
              key={contentUrl}
            >
              {/* @ts-expect-error #1 */}
              <SolitoImage
                src={contentUrl}
                fill
                resizeMode="cover"
                alt={altText}
                placeholder="blur"
                blurDataURL="|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
              />
            </Stack>
          ))}
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

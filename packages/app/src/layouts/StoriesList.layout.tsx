import { XStack, ScrollView, Paragraph } from "ui";
import { useTranslation } from "i18n";
import { useStories } from "store/src/apis/feed/feed.api";
import { StoriesListSkeleton } from "../skeletons/StoriesListskeleton";
import { StoryCardView } from "../views/StoryCard.view";

export const CARD_WIDTH = 100;
export const CARD_HEIGHT = 150;

/**
 * @dev
 * #1 Vendor type issue
 */
const HorizontalCardsLayout = () => {
  const { t } = useTranslation("rest");
  const {
    data,
    isError,
    isFetching,
    isSuccess,
    isUninitialized,
    isLoading,
    error,
  } = useStories({ offset: 0, limit: 10 });

  if (isError) {
    return (
      <>
        <Paragraph>There is an error</Paragraph>
        <Paragraph>{error}</Paragraph>
      </>
    );
  }

  if (isLoading || isFetching) {
    return <StoriesListSkeleton />;
  }

  if (!data || data.status !== "success") {
    return <Paragraph>Server-side error</Paragraph>;
  }

  if (!data.payload.length) {
    return <Paragraph>Empty list</Paragraph>;
  }

  return (
    <XStack>
      <ScrollView horizontal paddingLeft="$4" paddingRight="$4" space="$3">
        {data.payload.map((story, i) => {
          const translatedStory = {
            ...story,
            creator: {
              ...story.creator,
              username: t(story.creator.username),
            },
            content: {
              ...story.content,
              media: {
                ...story.content.media,
                altText: t(story.content.media.altText),
              },
            },
          };
          return <StoryCardView key={i} story={translatedStory} />;
        })}
      </ScrollView>
    </XStack>
  );
};

export default HorizontalCardsLayout;

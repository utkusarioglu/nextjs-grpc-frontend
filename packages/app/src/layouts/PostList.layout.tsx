import { type FC } from "react";
import { Paragraph, YStack } from "ui";
import { useTranslation } from "i18n";
import { PostListCardView } from "../views/PostListCard.view";
import { useFetchPostsQuery } from "store";
import { PostListSkeleton } from "../skeletons/PostList.skeleton";

interface PostListLayoutProps {
  index: {
    start: number;
    end: number;
  };
}

const PostListLayout: FC<PostListLayoutProps> = ({ index: { start, end } }) => {
  const { t } = useTranslation("rest");
  const { data, error, isLoading, isFetching, isError } = useFetchPostsQuery({
    offset: 0,
    limit: 4,
  });

  if (isError) {
    return (
      <>
        <Paragraph>There is an error</Paragraph>
        <Paragraph>{error}</Paragraph>
      </>
    );
  }

  if (isLoading || isFetching) {
    return <PostListSkeleton />;
  }

  if (!data || data.status !== "success") {
    return <Paragraph>There is a server error</Paragraph>;
  }

  if (!data.payload.length) {
    return <Paragraph>Empty list</Paragraph>;
  }

  return (
    <YStack space="$4">
      {data.payload.map((post, i) => {
        const translatedPost = {
          ...post,
          creator: {
            ...post.creator,
            username: t(post.creator.username),
          },
          content: {
            ...post.content,
            media: post.content.media.map(({ type, content, altText }) => ({
              type,
              content,
              altText: t(altText),
            })),
            date: t(post.content.date),
            header: t(post.content.header),
            body: t(post.content.body),
          },
        };

        return <PostListCardView key={i} post={translatedPost} />;
      })}
    </YStack>
  );
};

export default PostListLayout;

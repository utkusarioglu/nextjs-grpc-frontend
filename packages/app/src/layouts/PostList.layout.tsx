import { type FC } from "react";
import { YStack } from "ui";
import { useTranslation } from "i18n";
import { PostListCardView } from "../views/PostListCard.view";
interface PostListLayoutProps {
  index: {
    start: number;
    end: number;
  };
}
const PostListLayout: FC<PostListLayoutProps> = ({ index: { start, end } }) => {
  const { t } = useTranslation("rest");

  const posts = Array(end - start)
    .fill(null)
    .map((_, j) => {
      const cursor = j + start * (end - start);

      return {
        creator: {
          profileImageUrl: [
            process.env.NEXT_PUBLIC_WEB_APP_URL,
            `mock/avatars/${cursor % 7}.jpg`,
          ].join("/"),
          username: t`rest:FeedScreen.Posts.Placeholder.Username`,
        },
        interaction: {
          isLiked: cursor % 3 == 0,
        },
        content: {
          media: Array((cursor % 3) + 1)
            .fill(null)
            .map((_, m) => ({
              type: "image" as "image",
              contentUrl: `/mock/post-content/${(cursor * 2 + m) % 18}.jpg`,
              altText: t`rest:FeedScreen.Posts.Placeholder.Content.AltText`,
            })),
          date: (cursor + 3).toString() + t`global:Time.Hour.Short`,
          header: t`rest:FeedScreen.Posts.Placeholder.Header`,
          body: t`rest:FeedScreen.Posts.Placeholder.Body`,
        },
      };
    });

  return (
    <YStack space="$4">
      {posts.map((post, i) => (
        <PostListCardView key={i} post={post} />
      ))}
    </YStack>
  );
};

export default PostListLayout;

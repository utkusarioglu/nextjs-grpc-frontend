import { SolitoImage } from "solito/image";
import { XStack, Card, H6, Avatar, ScrollView } from "ui";
import { useTranslation } from "i18n";

/**
 * @dev
 * #1 Vendor type issue
 */
const HorizontalCardsLayout = () => {
  const { t } = useTranslation("rest");

  return (
    <XStack>
      <ScrollView horizontal paddingLeft="$4" paddingRight="$4" space="$3">
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <Card
              key={i}
              width={100}
              height={150}
              borderRadius="$4"
              overflow="hidden"
            >
              <Card.Background>
                {/* @ts-ignore */}
                <SolitoImage
                  src={`/mock/post-content/${i}.jpg`}
                  fill
                  resizeMode="cover"
                  alt={t`rest:FeedScreen.ImageAlt`}
                />
              </Card.Background>
              <Avatar circular size="$2" position="absolute" top="$2" left="$2">
                <Avatar.Image
                  src={[
                    process.env.NEXT_PUBLIC_WEB_APP_URL,
                    `mock/avatars/${i % 7}.jpg`,
                  ].join("/")}
                />
                <Avatar.Fallback
                  // @ts-ignore #1
                  bc="$color6"
                />
              </Avatar>
              <Card.Header position="absolute" bottom="$2" left="$2" right="$2">
                <H6>
                  {t`rest:FeedScreen.HorizontalImage.Placeholder`} {i}
                </H6>
              </Card.Header>
            </Card>
          ))}
      </ScrollView>
    </XStack>
  );
};

export default HorizontalCardsLayout;

import CustomHeader from "ui/src/CustomHeader";
import { useRouter } from "solito/router";
import { useTranslation } from "i18n";
import { XStack, Button, Icons, Group } from "ui";

const FeedHeaderLayout = () => {
  const { t } = useTranslation("rest");
  const { push } = useRouter();

  return (
    <XStack
      justifyContent="space-between"
      marginBottom="$6"
      alignItems="center"
      paddingLeft="$4"
      paddingRight="$4"
    >
      <CustomHeader>{t`rest:FeedScreen.Greeting`}</CustomHeader>
      <Group orientation="horizontal">
        <Group.Item>
          <Button
            onPress={() =>
              push({
                pathname: "/settings",
              })
            }
          >
            <Icons.User />
          </Button>
        </Group.Item>
        <Group.Item>
          <Button
            onPress={() =>
              push({
                pathname: "/settings",
              })
            }
          >
            <Icons.Settings />
          </Button>
        </Group.Item>
      </Group>
    </XStack>
  );
};

export default FeedHeaderLayout;

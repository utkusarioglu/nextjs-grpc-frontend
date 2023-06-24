import CustomButton from "ui/src/CustomButton";
import CustomHeader from "ui/src/CustomHeader";
import CustomInput from "ui/src/CustomInput";
import { useRouter } from "solito/router";
import {
  Spacer,
  Stack,
  YStack,
  XStack,
  Button,
  Icons,
  Paragraph,
  ScrollView,
  Group,
} from "ui";
import { SolitoImage } from "solito/image";
import { useTranslation } from "i18n";

const HomeScreen = () => {
  const { push } = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView>
      <YStack>
        <Spacer />
        <XStack
          justifyContent="space-between"
          marginBottom="$6"
          alignItems="center"
          paddingLeft="$4"
          paddingRight="$4"
        >
          <CustomHeader>{t("feed.header")}</CustomHeader>
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
        <Stack paddingLeft="$4" paddingRight="$4">
          <CustomInput />
        </Stack>
        <Spacer />
        {/* @ts-ignore */}
        <YStack>
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <Stack key={i}>
                <Stack height={300} key={i} borderRadius="$4" overflow="hidden">
                  {/* @ts-expect-error */}
                  <SolitoImage
                    src={`/mock/image-${i}.jpg`}
                    fill
                    resizeMode="cover"
                    alt="A cool image, imported locally."
                  />
                </Stack>
                <Spacer />
              </Stack>
            ))}
        </YStack>
        <XStack
          paddingLeft="$4"
          paddingRight="$4"
          justifyContent="space-evenly"
        >
          <CustomButton userId={1} flex={1}>
            One
          </CustomButton>
          <Spacer />
          <CustomButton userId={2} flex={1}>
            Two
          </CustomButton>
          <Spacer />
          <CustomButton userId={3} flex={1}>
            Three
          </CustomButton>
        </XStack>
        <Spacer />
        <Spacer size="$12" />
      </YStack>
    </ScrollView>
  );
};

export default HomeScreen;

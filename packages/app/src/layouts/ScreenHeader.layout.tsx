import { Stack, XStack, H4, Icons, Button, useWindowDimensions } from "ui";
import { useRouter } from "solito/router";
import { type FC } from "react";

interface ScreenHeaderLayoutProps {
  title: string;
}

export const ScreenHeaderLayout: FC<ScreenHeaderLayoutProps> = ({ title }) => {
  const { back } = useRouter();
  const { width } = useWindowDimensions();

  return (
    <XStack
      borderBottomColor="$color5"
      borderBottomWidth={1}
      height="$6"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        justifyContent="center"
      >
        <Button
          borderWidth={0}
          backgroundColor={"$color2"}
          onPress={() => back()}
        >
          <Icons.ArrowLeft />
        </Button>
      </Stack>
      <H4 maxWidth={width - 170}>{title}</H4>
    </XStack>
  );
};

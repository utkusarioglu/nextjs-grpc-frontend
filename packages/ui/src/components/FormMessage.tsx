import { SizableText, styled } from "tamagui";

export const FormMessage = styled(SizableText, {
  name: "InputMessage", // useful for debugging, and Component themes
  variants: {
    alignment: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
    },
  } as const,
});

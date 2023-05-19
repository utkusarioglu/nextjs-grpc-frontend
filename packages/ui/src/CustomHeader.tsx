import { H1, styled } from "tamagui";

// const CustomHeader = ({ text }: { text: string }) => {
//   return <H1>{text}</H1>;
// };

const CustomHeader = styled(H1, {
  color: "pink",
});

export default CustomHeader;

import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  color?: string;
  fontSize?: string;
};

export const Button = ({
  title,
  fontSize = "sm",
  color = "gray.700",
  ...rest
}: Props) => {
  return (
    <NativeBaseButton
      w="full"
      py={4}
      px={4}
      rounded="lg"
      _pressed={{
        bg: "none",
      }}
      {...rest}
    >
      <Text color={color} fontFamily="heading" fontSize={fontSize}>
        {title}
      </Text>
    </NativeBaseButton>
  );
};

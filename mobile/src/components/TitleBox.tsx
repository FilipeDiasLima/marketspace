import { Text, ITextProps } from "native-base";

type Props = ITextProps & {
  title: string;
};

export const TitleBox = ({ title, ...rest }: Props) => {
  return (
    <Text fontSize="md" color="gray.300" {...rest}>
      {title}
    </Text>
  );
};

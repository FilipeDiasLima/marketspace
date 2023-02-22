import { Badge, Text, IBadgeProps } from "native-base";

type Props = IBadgeProps & {
  isNew: boolean;
};

export const BadgeStatus = ({ isNew, ...rest }: Props) => {
  return (
    <Badge
      variant="solid"
      rounded="full"
      bg={isNew ? "blue.100" : "gray.200"}
      px={2}
      maxW={16}
      {...rest}
    >
      <Text color="white" fontFamily="heading" fontSize="xs">
        {isNew ? "NOVO" : "USADO"}
      </Text>
    </Badge>
  );
};

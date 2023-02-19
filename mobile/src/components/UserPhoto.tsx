import { Avatar, IAvatarProps, Box, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";
type Props = IAvatarProps & {
  size: string;
  color?: string;
};

export function UserPhoto({ size, color = "gray.600", ...rest }: Props) {
  return (
    <Box>
      <Avatar size={size} borderWidth={2} borderColor="blue.light" {...rest}>
        <Avatar.Badge
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={3}
          bg="blue.light"
          borderColor="blue.light"
        >
          <Icon as={<Feather name="edit-3" size={24} />} color={color} />
        </Avatar.Badge>
      </Avatar>
    </Box>
  );
}

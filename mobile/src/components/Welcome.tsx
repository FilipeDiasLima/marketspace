import { useAuth } from "@hooks/useAuth";
import { apiURL } from "@service/url";
import { Avatar, HStack, Text, VStack } from "native-base";

export const Welcome = () => {
  const { user } = useAuth();

  return (
    <HStack alignItems="center" flex={1}>
      <Avatar
        size={12}
        source={{ uri: `${apiURL}/images/${user.avatar}` }}
        mr={4}
        borderWidth={3}
        borderColor="blue.light"
      />
      <VStack>
        <Text fontSize="md">Boas vindas,</Text>
        <Text fontSize="md" fontFamily="heading">
          {user.name}!
        </Text>
      </VStack>
    </HStack>
  );
};

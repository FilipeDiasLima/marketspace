import { useAuth } from "@hooks/useAuth";
import { Avatar, HStack, Text, VStack } from "native-base";

export const Welcome = () => {
  const { user } = useAuth();
  console.log(process.env.API_URL);
  console.log(`${process.env.API_URL}/images/${user.avatar}`);
  return (
    <HStack alignItems="center" flex={1}>
      <Avatar
        size={12}
        source={{ uri: `${process.env.API_URL}/images/${user.avatar}` }}
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

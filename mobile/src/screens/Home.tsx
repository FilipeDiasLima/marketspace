import { Button } from "@components/Button";
import { Welcome } from "@components/Welcome";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Button as NativeBaseButton,
} from "native-base";

export default function Home() {
  return (
    <VStack px={6} pt={6} pb={10}>
      <HStack>
        <Welcome />
        <Button
          title="Criar anúncio"
          py={2}
          maxW={170}
          fontSize="md"
          bg="gray.100"
          size="md"
          leftIcon={<Icon as={<Ionicons name="add" />} size="lg" />}
          _pressed={{
            bg: "gray.200",
          }}
        />
      </HStack>
      <Text fontSize="sm">Seus produtos anunciados para venda</Text>
      <Box>
        <Icon as={<AntDesign name="tagso" />} size="xl" />
        <VStack>
          <Text>4</Text>
          <Text>anúncios ativos</Text>
        </VStack>
        <NativeBaseButton
          rightIcon={<Icon as={<Ionicons name="arrow-redo-outline" />} />}
        >
          Meus anúncios
        </NativeBaseButton>
      </Box>
    </VStack>
  );
}

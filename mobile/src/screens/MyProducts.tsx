import { MyProductCard } from "@components/MyProductCard";
import { ProductDTO } from "@dtos/Product";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigationRoutesProps } from "@routes/app.routes";
import { api } from "@service/api";
import AppError from "@utils/AppError";
import {
  Box,
  HStack,
  Icon,
  Menu,
  Pressable,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function MyProducts() {
  const toast = useToast();
  const navigation = useNavigation<AppStackNavigationRoutesProps>();

  const [status, setStatus] = useState("Todos");
  const [productsList, setProductsList] = useState<ProductDTO[]>([]);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const fetchAds = async () => {
    try {
      const { data } = await api.get("/users/products");
      setProductsList(data);
      setProducts(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError;

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (status.toLowerCase() === "ativos") {
      const aux = productsList.filter((product) => product.is_active);
      setProducts(aux);
    } else if (status.toLowerCase() === "inativos") {
      const aux = productsList.filter((product) => !product.is_active);
      setProducts(aux);
    } else {
      setProducts(productsList);
    }
  }, [status]);

  return (
    <VStack px={6} py={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Icon
          as={<Ionicons name="add" />}
          size="lg"
          color="gray.100"
          opacity={0}
        />
        <Text fontFamily="heading" fontSize="lg">
          Meus anúncios
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("newProduct")}>
          <Icon as={<Ionicons name="add" />} size="2xl" color="gray.100" />
        </TouchableOpacity>
      </HStack>

      <HStack justifyContent="space-between" alignItems="center" mt={6}>
        <Text>9 anúncios</Text>
        <Box w={120}>
          <Menu
            w={120}
            rounded="lg"
            mt={1}
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Box
                    px={2}
                    py={2}
                    rounded="md"
                    borderWidth={1}
                    borderColor="gray.500"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDir="row"
                  >
                    <Text color="gray.100">{status}</Text>
                    <Icon as={<AntDesign name="down" />} color="gray.300" />
                  </Box>
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => setStatus("Todos")}>Todos</Menu.Item>
            <Menu.Item onPress={() => setStatus("Ativos")}>Ativos</Menu.Item>
            <Menu.Item onPress={() => setStatus("Inativos")}>
              Inativos
            </Menu.Item>
          </Menu>
        </Box>
      </HStack>

      <SimpleGrid columns={2} w="100%" spacingX={5}>
        {products.map((item) => (
          <MyProductCard key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}

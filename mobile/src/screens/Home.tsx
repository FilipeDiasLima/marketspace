import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { LoadingChildren } from "@components/LoadingChildren";
import { ProductCard } from "@components/ProductCard";
import { TitleBox } from "@components/TitleBox";
import { Welcome } from "@components/Welcome";
import { ProductDTO } from "@dtos/Product";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  AppStackNavigationRoutesProps,
  AppTabNavigationRoutesProps,
} from "@routes/app.routes";
import { api } from "@service/api";
import AppError from "@utils/AppError";
import {
  Box,
  Button as NativeBaseButton,
  Divider,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  SimpleGrid,
  Text,
  useDisclose,
  useToast,
  VStack,
} from "native-base";
import { useCallback, useState } from "react";

export default function Home() {
  const toast = useToast();
  const navigationStack = useNavigation<AppStackNavigationRoutesProps>();
  const navigationTabs = useNavigation<AppTabNavigationRoutesProps>();

  const { isOpen, onOpen, onClose } = useDisclose();

  const [productName, setProductName] = useState("");
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [isNewQuery, setIsNewQuery] = useState<boolean | undefined>(undefined);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [productsActives, setProductsActives] = useState(0);
  const [adsList, setAdsList] = useState<ProductDTO[]>([]);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const { data } = await api.get("/products", {
        params: {
          query: productName || undefined,
          is_new: isNewQuery,
          accept_trade: acceptTrade || undefined,
          payment_methods: JSON.stringify(paymentMethods),
        },
      });
      setAdsList(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError;

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  };

  async function loadUserProducts() {
    try {
      const { data } = await api.get("/users/products");
      const aux = data.filter((product: ProductDTO) => product.is_active);
      setProductsActives(aux.length);
    } catch (error) {
      throw error;
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [, isNewQuery, acceptTrade, paymentMethods])
  );

  useFocusEffect(
    useCallback(() => {
      loadUserProducts();
    }, [])
  );

  return (
    <ScrollView>
      <VStack pt={16} px={6} pb={20}>
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
            onPress={() => navigationStack.navigate("newProduct")}
          />
        </HStack>

        <TitleBox mt={10} title="Seus produtos anunciados para venda" />
        <Pressable onPress={() => navigationTabs.navigate("myProducts")}>
          <Box
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            bg="blue.card"
            rounded="lg"
            px={2}
            py={4}
            mt={2}
          >
            <Icon as={<AntDesign name="tagso" />} size="xl" color="blue.100" />
            <VStack>
              <Text fontSize="lg" fontFamily="heading">
                {productsActives}
              </Text>
              <Text>anúncios ativos</Text>
            </VStack>
            <NativeBaseButton
              variant="ghost"
              _pressed={{
                bg: "none",
              }}
              onPress={() => navigationTabs.navigate("myProducts")}
              rightIcon={
                <Icon
                  as={<Ionicons name="arrow-forward" />}
                  size="sm"
                  color="blue.100"
                />
              }
            >
              <Text color="blue.100" fontFamily="heading">
                Meus anúncios
              </Text>
            </NativeBaseButton>
          </Box>
        </Pressable>

        <TitleBox mt={10} title="Compre produtos variados" />
        <Box
          flexDir="row"
          mt={4}
          alignItems="center"
          bg="gray.700"
          rounded="lg"
          px={2}
        >
          <Box flex={1}>
            <Input
              value={productName}
              onChangeText={setProductName}
              placeholder="Buscar anúncio"
              _focus={{
                borderWidth: 0,
                bg: "transparent",
              }}
            />
          </Box>
          <NativeBaseButton
            variant="ghost"
            p={2}
            rounded="lg"
            _pressed={{ bg: "blue.card" }}
            onPress={fetchProducts}
          >
            <Icon as={<Feather name="search" />} color="gray.200" size="md" />
          </NativeBaseButton>
          <Divider
            orientation="vertical"
            bg="gray.400"
            thickness={1}
            mx={2}
            h="50%"
          />
          <NativeBaseButton
            variant="ghost"
            p={2}
            rounded="lg"
            _pressed={{ bg: "blue.card" }}
            onPress={onOpen}
          >
            <Icon as={<Feather name="sliders" />} color="gray.200" size="md" />
          </NativeBaseButton>
        </Box>

        {isLoadingProducts ? (
          <LoadingChildren />
        ) : (
          <SimpleGrid columns={2} w="100%" spacingX={5}>
            {adsList.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
      <Filter
        isOpen={isOpen}
        onClose={onClose}
        isNewQuery={isNewQuery}
        acceptTrade={acceptTrade}
        paymentMethods={paymentMethods}
        setIsNewQuery={(value) => setIsNewQuery(value)}
        setAcceptTrade={(value) => setAcceptTrade(value)}
        setPaymentMethods={(value) => setPaymentMethods(value)}
      />
    </ScrollView>
  );
}

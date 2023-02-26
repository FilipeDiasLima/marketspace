import { BadgeStatus } from "@components/BadgeStatus";
import { BottomBox } from "@components/BottomBox";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { PaymentMethodsIcon } from "@components/PaymentMethodsIcon";
import { ProductImagesCarousel } from "@components/ProductImagesCarousel";
import { ProductDTO } from "@dtos/Product";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "@service/api";
import AppError from "@utils/AppError";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";

type RouteParams = {
  productId: string;
};

export default function ProductDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<ProductDTO>({} as ProductDTO);

  const { productId } = route.params as RouteParams;

  async function fetchProductDetails() {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/products/${productId}`);
      console.log(data);
      setProductData(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError;

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <ScrollView>
          <Box px={6} pt={6}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                as={<AntDesign name="arrowleft" />}
                size="lg"
                color="gray.100"
              />
            </TouchableOpacity>
          </Box>

          <Box mt={4}>
            <ProductImagesCarousel
              name={productData.name}
              product_images={productData.product_images}
            />
          </Box>

          <VStack py={6} px={6}>
            <HStack alignItems="center">
              <Avatar
                size={10}
                source={{
                  uri: `${process.env.API_URL}/images/${productData.user?.avatar}`,
                }}
                mr={4}
                borderWidth={3}
                borderColor="blue.light"
              />
              <Text>{productData.user.name}</Text>
            </HStack>

            <BadgeStatus mt={6} py={1} isNew={productData.is_new} />

            <HStack mt={2} justifyContent="space-between">
              <Heading fontFamily="heading" fontSize="lg" flex={1}>
                {productData.name}
              </Heading>
              <Text
                fontFamily="heading"
                fontSize="lg"
                color="blue.light"
                flex={0.8}
                textAlign="right"
              >
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(productData.price! / 100)}
              </Text>
            </HStack>

            <Text mt={2} color="gray.200">
              {productData.description}
            </Text>

            <HStack mt={6}>
              <Text color="gray.200" fontFamily="heading">
                Aceita troca?
              </Text>
              <Text color="gray.200" ml={2}>
                {productData.accept_trade ? "Sim" : "Não"}
              </Text>
            </HStack>

            <VStack mt={6}>
              <Text mb={1} color="gray.200" fontFamily="heading">
                Meios de pagamento:
              </Text>
              {productData.payment_methods.map((item) => (
                <PaymentMethodsIcon
                  key={item.key}
                  id={item.key}
                  name={item.name}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollView>
        <BottomBox>
          <Text
            fontFamily="heading"
            fontSize="xl"
            color="blue.100"
            flex={1}
            textAlign="left"
          >
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(productData.price! / 100)}
          </Text>
          <Button
            title="Entrar em contato"
            bg="blue.light"
            leftIcon={
              <Icon
                as={<Ionicons name="ios-logo-whatsapp" />}
                color="gray.600"
                size="md"
              />
            }
            flex={1}
          />
        </BottomBox>
      </>
    );
  }
}

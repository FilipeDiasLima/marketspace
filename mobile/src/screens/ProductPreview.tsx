import { BadgeStatus } from "@components/BadgeStatus";
import { BottomBox } from "@components/BottomBox";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { NewProductImagesCarousel } from "@components/NewProductImagesCarousel";
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
  product: string;
};

type NewProductDTO = {
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: string[];
  product_images: any[];
  user: {
    avatar: string;
    name: string;
    tel: string;
  };
};

export default function ProductPreview() {
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();
  const { product } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<NewProductDTO>(
    JSON.parse(product)
  );

  console.log(JSON.parse(product));

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <ScrollView>
          <Box px={6} pt={16} pb={4} bg="blue.light" alignItems="center">
            <Text color="gray.700" fontSize="lg" fontFamily="heading">
              Pré visualização do anúncio
            </Text>
            <Text color="gray.700" fontSize="md">
              É assim que seu produto vai aparecer!
            </Text>
          </Box>

          <Box>
            <NewProductImagesCarousel
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
                <PaymentMethodsIcon key={item} id={item} name={item} />
              ))}
            </VStack>
          </VStack>
        </ScrollView>
        <BottomBox>
          <Button
            title="Voltar e editar"
            bg="gray.500"
            fontSize="md"
            color="gray.200"
            _pressed={{
              bg: "gray.400",
            }}
            leftIcon={
              <Icon
                as={<AntDesign name="arrowleft" />}
                color="gray.200"
                size="md"
              />
            }
            flex={1}
            onPress={() => navigation.goBack()}
          />
          <Button
            title="Publicar"
            bg="blue.light"
            fontSize="md"
            _pressed={{
              bg: "blue.100",
            }}
            leftIcon={
              <Icon
                as={<AntDesign name="tagso" />}
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

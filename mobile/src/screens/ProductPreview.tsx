import { BadgeStatus } from "@components/BadgeStatus";
import { BottomBox } from "@components/BottomBox";
import { Button } from "@components/Button";
import { NewProductImagesCarousel } from "@components/NewProductImagesCarousel";
import { PaymentMethodsIcon } from "@components/PaymentMethodsIcon";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@hooks/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppTabNavigationRoutesProps } from "@routes/app.routes";
import { api } from "@service/api";
import { apiURL } from "@service/url";
import AppError from "@utils/AppError";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";

type RouteParams = {
  product: string;
  edit?: boolean;
};

type NewProductDTO = {
  id?: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: string[];
  product_images: any[];
  product_images_to_delete?: string[];
  user: {
    avatar: string;
    name: string;
    tel: string;
  };
};

export default function ProductPreview() {
  const navigation = useNavigation<AppTabNavigationRoutesProps>();
  const { user } = useAuth();
  const route = useRoute();
  const toast = useToast();

  const { product, edit } = route.params as RouteParams;

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [productData, setProductData] = useState<NewProductDTO>(
    JSON.parse(product)
  );

  async function handlePublishProduct() {
    setIsButtonLoading(true);
    try {
      const response = await api.post("/products", {
        name: productData.name,
        description: productData.description,
        is_new: productData.is_new,
        price: productData.price,
        accept_trade: productData.accept_trade,
        payment_methods: productData.payment_methods,
      });

      const data = new FormData();
      data.append("product_id", response.data.id);

      productData.product_images.forEach((image) => {
        const imageExtension = image.uri.split(".").pop();

        const imageFile = {
          name: `${user.name.replace(" ", "")}.${imageExtension}`,
          uri: image.uri,
          type: `image/${imageExtension}`,
        } as any;

        data.append("images", imageFile);
      });

      await api.post("/products/images", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigation.navigate("myProducts");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError;

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsButtonLoading(false);
    }
  }

  async function handleSaveEdit() {
    setIsButtonLoading(true);
    try {
      await api.put(`/products/${productData.id}`, {
        name: productData.name,
        description: productData.description,
        is_new: productData.is_new,
        price: productData.price,
        accept_trade: productData.accept_trade,
        payment_methods: productData.payment_methods,
      });

      if (
        productData.product_images_to_delete &&
        productData.product_images_to_delete.length > 0
      ) {
        await api.delete("/products/images", {
          data: {
            productImagesIds: productData.product_images_to_delete!,
          },
        });
      }

      let newImage = false;
      const data = new FormData();
      data.append("product_id", productData.id!);

      productData.product_images.forEach((image) => {
        if (image.uri) {
          newImage = true;
          const imageExtension = image.uri.split(".").pop();

          const imageFile = {
            name: `${user.name.replace(" ", "")}.${imageExtension}`,
            uri: image.uri,
            type: `image/${imageExtension}`,
          } as any;

          data.append("images", imageFile);
        }
      });

      if (newImage) {
        await api.post("/products/images", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigation.navigate("myProducts");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError;

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsButtonLoading(false);
    }
  }

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
                uri: `${apiURL}/images/${productData.user?.avatar}`,
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
          isLoading={isButtonLoading}
          onPress={!edit ? handlePublishProduct : handleSaveEdit}
          leftIcon={
            <Icon as={<AntDesign name="tagso" />} color="gray.600" size="md" />
          }
          flex={1}
        />
      </BottomBox>
    </>
  );
}

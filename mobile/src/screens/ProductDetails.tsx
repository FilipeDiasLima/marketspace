import NoImageProduct from "@assets/no-product-image.png";
import { BadgeStatus } from "@components/BadgeStatus";
import { Loading } from "@components/Loading";
import { ProductDTO } from "@dtos/Product";
import { Ionicons } from "@expo/vector-icons";
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
import Carousel, { Pagination } from "react-native-snap-carousel";

type RouteParams = {
  productId: string;
};

const iconName = (type: string) => {
  switch (type) {
    case "card":
      return "card-outline";
    case "deposit":
      return "briefcase-outline";
    case "cash":
      return "cash-outline";
    case "pix":
      return "qr-code-outline";
    case "boleto":
      return "barcode-outline";
    default:
      break;
  }
};

const SLIDER_WIDTH = Dimensions.get("window").width + 20;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

export default function ProductDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();

  const isCarousel = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<ProductDTO>({} as ProductDTO);

  const { productId } = route.params as RouteParams;

  function handleGoBack() {
    navigation.goBack();
  }

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
      <ScrollView>
        <Box px={6} pt={6}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon
              as={<Ionicons name="arrow-back" />}
              size="lg"
              color="gray.100"
            />
          </TouchableOpacity>
        </Box>

        <Box mt={4} position="relative">
          <Carousel
            layout="default"
            vertical={false}
            itemWidth={ITEM_WIDTH}
            sliderWidth={SLIDER_WIDTH}
            layoutCardOffset={9}
            inactiveSlideShift={0}
            useScrollView={true}
            ref={isCarousel}
            onSnapToItem={(index) => setSlideIndex(index)}
            data={productData.product_images}
            renderItem={(item, index) => (
              <Image
                source={
                  productData.product_images
                    ? {
                        uri: `${process.env.API_URL}/images/${
                          productData.product_images[item.index]?.path
                        }`,
                      }
                    : NoImageProduct
                }
                alt={productData.name}
                h={300}
                w="100%"
              />
            )}
          />
          <Pagination
            containerStyle={{
              position: "absolute",
              bottom: -20,
              left: 0,
              right: 0,
              padding: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            dotsLength={productData.product_images.length}
            activeDotIndex={slideIndex}
            inactiveDotOpacity={0.7}
            inactiveDotScale={1}
            // @ts-ignore
            renderDots={(activeIndex) =>
              productData.product_images.map((item, index) => (
                <Box
                  key={item.id}
                  bg="gray.700"
                  opacity={activeIndex === index ? 1 : 0.7}
                  flex={0.49}
                  h={1}
                  rounded="full"
                />
              ))
            }
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
              <HStack key={item.key} space={1} mt={1}>
                <Icon
                  as={<Ionicons name={iconName(item.key)} />}
                  color="gray.200"
                  size="sm"
                />
                <Text color="gray.200">{item.name}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    );
  }
}

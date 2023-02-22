import NoImageProduct from "@assets/no-product-image.png";
import { BadgeStatus } from "@components/BadgeStatus";
import { Loading } from "@components/Loading";
import { ProductDTO } from "@dtos/Product";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "@service/api";
import AppError from "@utils/AppError";
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

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default function ProductDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();

  const isCarousel = useRef(null);
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
    <Loading />;
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

        <Box mt={4}>
          <Carousel
            layout="default"
            vertical={false}
            itemWidth={ITEM_WIDTH}
            sliderWidth={SLIDER_WIDTH}
            layoutCardOffset={9}
            inactiveSlideShift={0}
            useScrollView={true}
            ref={isCarousel}
            data={productData.product_images}
            renderItem={() => (
              <Image
                source={
                  productData.product_images
                    ? {
                        uri: `${process.env.API_URL}/images/${productData.product_images[0]?.path}`,
                      }
                    : NoImageProduct
                }
                alt={productData.name}
                h={290}
                w="100%"
              />
            )}
          />
          <Pagination
            dotsLength={productData.product_images.length}
            activeDotIndex={0}
            containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: "rgba(255, 255, 255, 0.92)",
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
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

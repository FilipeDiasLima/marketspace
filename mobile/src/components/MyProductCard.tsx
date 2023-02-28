import { ProductDTO } from "@dtos/Product";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Badge,
  Box,
  HStack,
  Image,
  Pressable,
  Text,
} from "native-base";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import NoImageProduct from "@assets/no-product-image.png";
import { AppStackNavigationRoutesProps } from "@routes/app.routes";
import { BadgeStatus } from "./BadgeStatus";
import { Dimensions } from "react-native";

type Props = {
  item: ProductDTO;
};

const WIDTH = Dimensions.get("window").width + 20;

export const MyProductCard = ({ item }: Props) => {
  const navigation = useNavigation<AppStackNavigationRoutesProps>();

  function handleOpenProductDetails(id: string) {
    navigation.navigate("productDetails", { productId: id });
  }

  console.log(process.env.API_URL);

  return (
    <Pressable onPress={() => handleOpenProductDetails(item.id)}>
      <Box flexDir="column" mt={8}>
        <Box position="relative">
          {!item.is_active && (
            <>
              <Box
                position="absolute"
                zIndex={2}
                w={WIDTH <= 425 ? 160 : 180}
                h={120}
                bg="gray.100"
                rounded="lg"
                opacity={0.5}
              />
              <Text
                position="absolute"
                zIndex={3}
                bottom={2}
                left={2}
                fontSize="sm"
                color="white"
              >
                ANÚNCIO DESATIVADO
              </Text>
            </>
          )}
          <BadgeStatus
            isNew={item.is_new}
            position="absolute"
            zIndex={1}
            top={2}
            right={2}
          />
          <Image
            w={WIDTH <= 425 ? 160 : 180}
            h={120}
            rounded="lg"
            source={
              item.product_images[0]
                ? {
                    uri: `${process.env.API_URL}/images/${item.product_images[0].path}`,
                  }
                : NoImageProduct
            }
            alt={item.name}
          />
        </Box>
        <Box opacity={item.is_active ? 1 : 0.5}>
          <Text mt={1} fontSize="md" numberOfLines={1} maxW={180}>
            {item.name}
          </Text>
          <Text mt={1} fontSize="lg" fontFamily="heading">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.price! / 100)}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

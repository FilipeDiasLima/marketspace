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
import { apiURL } from "@service/url";

type Props = {
  item: ProductDTO;
};

const WIDTH = Dimensions.get("window").width + 20;

export const ProductCard = ({ item }: Props) => {
  const navigation = useNavigation<AppStackNavigationRoutesProps>();

  function handleOpenProductDetails(id: string) {
    navigation.navigate("productDetails", { productId: id });
  }

  return (
    <Pressable onPress={() => handleOpenProductDetails(item.id!)}>
      <Box flexDir="column" mt={8}>
        <Box position="relative">
          <HStack
            position="absolute"
            zIndex={1}
            p={2}
            justifyContent="space-between"
            w="100%"
          >
            <Avatar
              size="sm"
              borderWidth={1}
              borderColor="gray.700"
              source={
                item.product_images[0]
                  ? {
                      uri: `${apiURL}/images/${item.user.avatar}`,
                    }
                  : NoImageProduct
              }
            />
            <BadgeStatus isNew={item.is_new} />
          </HStack>
          <Image
            w={WIDTH <= 425 ? 160 : 180}
            h={120}
            rounded="lg"
            source={
              item.product_images[0]
                ? {
                    uri: `${apiURL}/images/${item.product_images[0].path}`,
                  }
                : NoImageProduct
            }
            alt={item.name}
          />
        </Box>
        <Text
          mt={1}
          fontSize="md"
          numberOfLines={1}
          maxW={WIDTH <= 425 ? 160 : 180}
        >
          {item.name}
        </Text>
        <Text
          mt={1}
          fontSize="lg"
          fontFamily="heading"
          numberOfLines={1}
          maxW={WIDTH <= 425 ? 160 : 180}
        >
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.price! / 100)}
        </Text>
      </Box>
    </Pressable>
  );
};

import { ProductDTO } from "@dtos/Product";
import { Avatar, Badge, Box, HStack, Image, Text } from "native-base";

import NoImageProduct from "@assets/no-product-image.png";

type Props = {
  item: ProductDTO;
};

export const ProductCard = ({ item }: Props) => {
  return (
    <Box flexDir="column" mt={8}>
      <Box>
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
                    uri: `${process.env.API_URL}/images/${item.user.avatar}`,
                  }
                : NoImageProduct
            }
          />
          <Badge
            variant="solid"
            rounded="full"
            bg={item.is_new ? "blue.100" : "gray.200"}
            px={2}
          >
            <Text color="white" fontFamily="heading" fontSize="xs">
              {item.is_new ? "NOVO" : "USADO"}
            </Text>
          </Badge>
        </HStack>
        <Image
          w={180}
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
  );
};

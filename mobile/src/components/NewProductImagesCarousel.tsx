import { apiURL } from "@service/url";
import { Box, HStack, Image } from "native-base";
import { useRef, useState } from "react";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

type Props = {
  product_images: any[];
  name: string;
};

export const NewProductImagesCarousel = ({ name, product_images }: Props) => {
  const { width } = Dimensions.get("window");
  const carouselRef = useRef<ICarouselInstance>(null);

  const [slideIndex, setSlideIndex] = useState(0);
  return (
    <GestureHandlerRootView>
      <Carousel
        loop={false}
        ref={carouselRef}
        data={product_images}
        width={width}
        height={300}
        onSnapToItem={(index) => setSlideIndex(index)}
        renderItem={({ item, index }) => (
          <Image
            key={index}
            source={{
              uri: item.uri || `${apiURL}/images/${item.path}`,
            }}
            alt={name}
            h={300}
            w="100%"
          />
        )}
      />
      {product_images.length > 1 && (
        <HStack space={2} position="absolute" bottom={1} px={1}>
          {product_images.map((item, index) => (
            <Box
              key={index}
              flex={1}
              h={1}
              bg="gray.700"
              rounded="full"
              opacity={slideIndex === index ? 1 : 0.6}
            />
          ))}
        </HStack>
      )}
    </GestureHandlerRootView>
  );
};

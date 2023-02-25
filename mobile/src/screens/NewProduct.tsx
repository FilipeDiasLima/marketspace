import { BottomBox } from "@components/BottomBox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Checkbox,
  HStack,
  Icon,
  Image,
  Pressable,
  Radio,
  ScrollView,
  Switch,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

export default function NewProduct() {
  const navigation = useNavigation();
  const toast = useToast();

  const [productImages, setProductImages] = useState<any[]>([]);
  const [productStatus, setProductStatus] = useState("");
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [acceptBoleto, setAcceptBoleto] = useState(false);
  const [acceptPix, setAcceptPix] = useState(false);
  const [acceptCash, setAcceptCash] = useState(false);
  const [acceptCard, setAcceptCard] = useState(false);
  const [acceptDeposit, setAcceptDeposit] = useState(false);

  async function handleUserPhotoSelect() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (photoSelected.canceled) return;

    if (photoSelected.assets[0]) {
      const photoInfo = await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri
      );

      if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
        return toast.show({
          title:
            "A imagem selecionado é pesada demais. O máximo permitido é 5mb",
          placement: "top",
          bg: "red.500",
          duration: 5000,
        });
      }

      const fileExtension = photoSelected.assets[0].uri.split(".").pop();

      const photoFile = {
        name: "",
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
      } as any;

      setProductImages([...productImages, photoFile]);
    }
  }

  function handleRemoveProductImage(id: number) {
    const aux = productImages.filter((image, index) => index !== id);
    setProductImages(aux);
  }

  return (
    <>
      <ScrollView px={6} py={6}>
        <VStack pb={12}>
          <HStack justifyContent="space-between">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                as={<AntDesign name="arrowleft" />}
                size="lg"
                color="gray.100"
              />
            </TouchableOpacity>
            <Text fontFamily="heading" fontSize="lg">
              Criar anúncio
            </Text>
            <Icon
              as={<AntDesign name="arrowleft" />}
              size="lg"
              color="gray.100"
              opacity={0}
            />
          </HStack>

          <Box mt={6}>
            <Text fontFamily="heading" color="gray.200" fontSize="md">
              Imagens
            </Text>
            <Text color="gray.300" mt={1}>
              Escolha até 3 imagens para mostrar o quando o seu produto é
              incrível!
            </Text>
            <HStack mt={4} space={2}>
              {productImages.map((image, index) => (
                <Animated.View
                  style={styles.imagesContainer}
                  layout={Layout}
                  entering={FadeIn}
                  exiting={FadeOut}
                >
                  <Box position="relative" key={index}>
                    <Image
                      source={{ uri: image.uri }}
                      bg="gray.500"
                      rounded="lg"
                      h={100}
                      w={100}
                      alt="product"
                    />
                    <Pressable
                      onPress={() => handleRemoveProductImage(index)}
                      position="absolute"
                      top={1}
                      right={1}
                      bg="gray.700"
                      rounded="full"
                    >
                      <Icon
                        as={<AntDesign name="closecircle" />}
                        color="gray.200"
                      />
                    </Pressable>
                  </Box>
                </Animated.View>
              ))}
              {productImages.length < 3 && (
                <Animated.View
                  style={styles.imagesContainer}
                  layout={Layout}
                  entering={FadeIn}
                  exiting={FadeOut}
                >
                  <TouchableOpacity onPress={handleUserPhotoSelect}>
                    <Box
                      bg="gray.500"
                      rounded="lg"
                      h={100}
                      w={100}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={<Ionicons name="add" />}
                        color="gray.400"
                        size="2xl"
                      />
                    </Box>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </HStack>
          </Box>

          <Text fontFamily="heading" color="gray.200" fontSize="md" mt={6}>
            Sobre o produto
          </Text>
          <Input mt={4} placeholder="Título do anúncio" />

          <TextArea mt={4} placeholder="Descrição do produto" h={160} />
          <Box mt={4}>
            <Radio.Group
              flexDir="row"
              alignItems="center"
              name="myRadioGroup"
              accessibilityLabel="Status do produto"
              value={productStatus}
              onChange={(nextValue) => {
                setProductStatus(nextValue);
              }}
              colorScheme="blue"
            >
              <Radio value="one">Produto novo</Radio>
              <Radio value="two" ml={4}>
                Produto usado
              </Radio>
            </Radio.Group>
          </Box>

          <Text fontFamily="heading" fontSize="md" mt={4}>
            Aceita troca?
          </Text>
          <Switch
            alignSelf="flex-start"
            mt={2}
            offTrackColor="gray.500"
            onTrackColor="blue.light"
            onThumbColor="gray.700"
            offThumbColor="gray.700"
            value={acceptTrade}
            onValueChange={(e) => setAcceptTrade(e)}
          />

          <Text fontFamily="heading" fontSize="md" mt={4} mb={2}>
            Meios de pagamento aceitos
          </Text>
          <Checkbox
            size="md"
            my={1}
            isChecked={acceptBoleto}
            onChange={() => setAcceptBoleto(!acceptBoleto)}
            value="boleto"
            _checked={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
            _pressed={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
          >
            <Text fontSize="md" color="gray.200">
              Boleto
            </Text>
          </Checkbox>
          <Checkbox
            size="md"
            my={1}
            value="pix"
            isChecked={acceptPix}
            onChange={() => setAcceptPix(!acceptPix)}
            _checked={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
            _pressed={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
          >
            <Text fontSize="md" color="gray.200">
              Pix
            </Text>
          </Checkbox>
          <Checkbox
            size="md"
            my={1}
            value="cash"
            isChecked={acceptCash}
            onChange={() => setAcceptCash(!acceptCash)}
            _checked={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
            _pressed={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
          >
            <Text fontSize="md" color="gray.200">
              Dinheiro
            </Text>
          </Checkbox>
          <Checkbox
            size="md"
            my={1}
            value="card"
            isChecked={acceptCard}
            onChange={() => setAcceptCard(!acceptCard)}
            _checked={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
            _pressed={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
          >
            <Text fontSize="md" color="gray.200">
              Cartão de Crédito
            </Text>
          </Checkbox>
          <Checkbox
            size="md"
            my={1}
            value="deposit"
            isChecked={acceptDeposit}
            onChange={() => setAcceptDeposit(!acceptDeposit)}
            _checked={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
            _pressed={{
              bg: "blue.light",
              borderColor: "blue.light",
            }}
          >
            <Text fontSize="md" color="gray.200">
              Depósito Bancário
            </Text>
          </Checkbox>
        </VStack>
      </ScrollView>
      <BottomBox>
        <Button
          title="Cancelar"
          flex={1}
          bg="gray.500"
          color="gray.200"
          _pressed={{
            bg: "gray.400",
          }}
        />
        <Button
          title="Avançar"
          flex={1}
          fontSize="md"
          bg="gray.100"
          size="md"
          _pressed={{
            bg: "gray.200",
          }}
        />
      </BottomBox>
    </>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: "row",
  },
});

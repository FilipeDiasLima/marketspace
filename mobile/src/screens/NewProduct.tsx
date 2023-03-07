import { BottomBox } from "@components/BottomBox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { ProductDTO } from "@dtos/Product";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigationRoutesProps } from "@routes/app.routes";
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
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import * as yup from "yup";

type FormData = {
  name: string;
  description: string;
  price: string;
};

const productSchema = yup.object({
  name: yup.string().required("Nome do produto obrigatório"),
  description: yup.string().required("Descrição do produto obrigatória"),
  price: yup.string().required("Preço do produto obrigatório"),
});

export default function NewProduct() {
  const navigation = useNavigation<AppStackNavigationRoutesProps>();
  const toast = useToast();

  const { user } = useAuth();

  const [productImages, setProductImages] = useState<any[]>([]);
  const [productStatus, setProductStatus] = useState("usado");
  const [acceptTrade, setAcceptTrade] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([
    "pix",
    "cash",
  ]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: "dciehwbciu wdiouch owid cldsn klcj hwljdncoiw dhco",
      name: "Teclado Keycron",
      price: "300,00",
    },
    resolver: yupResolver(productSchema),
  });

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

  function handleGoPreview({ description, name, price }: FormData) {
    const data = {
      name,
      description,
      price: Number(price.replace(/\D/g, "")),
      is_new: productStatus === "novo" ? true : false,
      accept_trade: acceptTrade,
      payment_methods: paymentMethods,
      product_images: productImages,
      user: {
        avatar: user.avatar,
        name: user.name,
        tel: user.tel,
      },
    };
    console.log(data);
    navigation.navigate("productPreview", { product: JSON.stringify(data) });
  }

  return (
    <>
      <ScrollView pt={16} px={6} py={6}>
        <VStack pb={16}>
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
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Título do anúncio"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextArea
                mt={4}
                placeholder="Descrição do produto"
                h={160}
                value={value}
                onChangeText={onChange}
                error={errors.description?.message}
              />
            )}
          />

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
              <Radio value="novo">Produto novo</Radio>
              <Radio value="usado" ml={4}>
                Produto usado
              </Radio>
            </Radio.Group>
          </Box>

          <Text fontFamily="heading" fontSize="md" mt={4}>
            Venda
          </Text>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                leftElement={
                  <Text ml={4} color="gray.100" fontSize="md">
                    R$
                  </Text>
                }
                mt={4}
                placeholder="Valor do produto"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                error={errors.price?.message}
              />
            )}
          />

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
          <Checkbox.Group onChange={setPaymentMethods} value={paymentMethods}>
            <Checkbox
              size="md"
              my={1}
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
          </Checkbox.Group>
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
          onPress={() => navigation.goBack()}
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
          onPress={handleSubmit(handleGoPreview)}
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

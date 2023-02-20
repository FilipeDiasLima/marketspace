import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import LogoSvg from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { TouchableOpacity } from "react-native";

import NoAvatar from "@assets/NoAvatar.png";
import { api } from "@service/api";
import AppError from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(6, "Senha deve conter pelo menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("password")], "A confirmação de senha não confere"),
});

export default function SignUp() {
  const toast = useToast();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });

  const phoneField = watch("phone");
  const nameField = watch("name");

  async function handleSignUp({ email, password, name, phone }: FormData) {
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("tel", phone.replace(/\D/g, ""));
      data.append("password", password);
      data.append("avatar", userPhoto);
      await api.post("/users", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await signIn(email, password);
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
        name: nameField || "",
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
      } as any;

      setUserPhoto(photoFile);
    }
  }

  useEffect(() => {
    phoneField &&
      setValue(
        "phone",
        phoneField.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
      );
  }, [phoneField]);

  return (
    <ScrollView px={16} showsVerticalScrollIndicator={false}>
      <VStack flex={1} alignItems="center" pb={16} borderBottomRadius={40}>
        <VStack alignItems="center" mt={10}>
          <LogoSvg width={70} />
          <Heading fontSize="lg" fontFamily="heading">
            Boas vindas!
          </Heading>
          <Text mt={2} textAlign="center" color="gray.300">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </VStack>
        <VStack alignItems="center" mt={8} w="100%">
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <UserPhoto
              source={userPhoto ? { uri: userPhoto.uri } : NoAvatar}
              size="xl"
            />
          </TouchableOpacity>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                autoCapitalize="none"
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Telefone"
                maxLength={15}
                value={value}
                onChangeText={onChange}
                error={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      as={
                        <Ionicons
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
                        />
                      }
                      size={5}
                      mr={4}
                    />
                  </Pressable>
                }
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Confirmar senha"
                type={showConfirmPassword ? "text" : "password"}
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
                InputRightElement={
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Icon
                      as={
                        <Ionicons
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
                        />
                      }
                      size={5}
                      mr={4}
                    />
                  </Pressable>
                }
              />
            )}
          />
          <Button
            title="Criar"
            bg="gray.100"
            mt={8}
            isLoading={isLoading}
            onPress={handleSubmit(handleSignUp)}
          />
        </VStack>
      </VStack>
      <VStack alignItems="center" justifyContent="space-between" pb={20}>
        <Text>Já possui uma conta?</Text>
        <Button
          mt={4}
          title="Ir para o login"
          bg="gray.500"
          color="gray.900"
          onPress={() => navigation.navigate("signIn")}
        />
      </VStack>
    </ScrollView>
  );
}

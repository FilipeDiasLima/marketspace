import {
  Center,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
  Icon,
  useToast,
} from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

type FormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const toast = useToast();

  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: FormData) {
    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      toast.show({
        title: "Error",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} bg="gray.700">
      <VStack
        flex={1}
        alignItems="center"
        px={16}
        pb={16}
        bg="gray.600"
        borderBottomRadius={40}
      >
        <VStack alignItems="center" mt={20}>
          <LogoSvg />
          <Heading mt={4} fontSize="2xl" fontFamily="heading">
            marketspace
          </Heading>
          <Text color="gray.300">Seu espaço de compra e venda</Text>
        </VStack>
        <VStack alignItems="center" mt={24} w="100%">
          <Text fontSize="md">Acesse sua conta</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="E-mail"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
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
          <Button
            title="Entrar"
            bg="blue.light"
            mt={8}
            isLoading={isLoading}
            onPress={handleSubmit(handleSignIn)}
          />
        </VStack>
      </VStack>
      <VStack
        alignItems="center"
        justifyContent="space-between"
        px={16}
        py={16}
      >
        <Text>Ainda não tem acesso?</Text>
        <Button
          mt={4}
          title="Criar uma conta"
          bg="gray.500"
          color="gray.900"
          onPress={() => navigation.navigate("signUp")}
        />
      </VStack>
    </ScrollView>
  );
}

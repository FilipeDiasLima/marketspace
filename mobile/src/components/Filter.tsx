import { AntDesign } from "@expo/vector-icons";
import {
  Button as NativeBaseButton,
  Actionsheet,
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  useDisclose,
  Switch,
  Checkbox,
} from "native-base";
import { useState } from "react";
import { AcceptTradeBox } from "./AcceptTradeBox";
import { Button } from "./Button";
import { PaymentMethodsCheckbox } from "./PaymentMethodsCheckbox";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Filter = ({ isOpen, onClose }: Props) => {
  const [newProductFilter, setNewProductFilter] = useState(false);
  const [usedProductFilter, setUsedProductFilter] = useState(false);

  function resetFilters() {
    setNewProductFilter(false);
    setUsedProductFilter(false);
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content px={8} pt={4} pb={10}>
        <HStack w="100%" justifyContent="space-between" mt={4}>
          <Text color="gray.100" fontFamily="heading" fontSize="lg">
            Filtrar anúncios
          </Text>
          <Pressable onPress={onClose}>
            <Icon as={<AntDesign name="close" />} color="gray.400" size={6} />
          </Pressable>
        </HStack>

        <Box w="100%" alignItems="flex-start" mt={6}>
          <Text fontFamily="heading" fontSize="md" mb={2}>
            Condiçao
          </Text>
          <HStack space={2}>
            <NativeBaseButton
              rounded="full"
              w={90}
              bg={newProductFilter ? "blue.light" : "gray.500"}
              _pressed={{
                bg: "none",
              }}
              onPress={() => setNewProductFilter(!newProductFilter)}
              rightIcon={
                newProductFilter ? (
                  <Icon
                    as={<AntDesign name="closecircle" />}
                    color="white"
                    size="sm"
                  />
                ) : (
                  <></>
                )
              }
            >
              <Text
                color={newProductFilter ? "white" : "gray.300"}
                fontFamily="heading"
              >
                NOVO
              </Text>
            </NativeBaseButton>
            <NativeBaseButton
              rounded="full"
              w={90}
              bg={usedProductFilter ? "blue.light" : "gray.500"}
              _pressed={{
                bg: "none",
              }}
              onPress={() => setUsedProductFilter(!usedProductFilter)}
              rightIcon={
                usedProductFilter ? (
                  <Icon
                    as={<AntDesign name="closecircle" />}
                    color="white"
                    size="sm"
                  />
                ) : (
                  <></>
                )
              }
            >
              <Text
                color={usedProductFilter ? "white" : "gray.300"}
                fontFamily="heading"
              >
                USADO
              </Text>
            </NativeBaseButton>
          </HStack>
        </Box>

        <AcceptTradeBox mt={6} />

        <PaymentMethodsCheckbox mt={6} />

        <Box w="100%" alignItems="flex-start" mt={12} mb={2}>
          <HStack space={6}>
            <Button
              title="Resetar filtros"
              flex={1}
              bg="gray.500"
              color="gray.200"
              _pressed={{
                bg: "gray.400",
              }}
              onPress={resetFilters}
            />
            <Button
              title="Aplicar filtros"
              flex={1}
              bg="gray.100"
              color="gray.700"
              _pressed={{
                bg: "gray.200",
              }}
            />
          </HStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

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
import { Button } from "./Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Filter = ({ isOpen, onClose }: Props) => {
  const [newProductFilter, setNewProductFilter] = useState(false);
  const [usedProductFilter, setUsedProductFilter] = useState(false);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [acceptBoleto, setAcceptBoleto] = useState(false);
  const [acceptPix, setAcceptPix] = useState(false);
  const [acceptCash, setAcceptCash] = useState(false);
  const [acceptCard, setAcceptCard] = useState(false);
  const [acceptDeposit, setAcceptDeposit] = useState(false);

  function resetFilters() {
    setNewProductFilter(false);
    setUsedProductFilter(false);
    setAcceptTrade(false);
    setAcceptBoleto(false);
    setAcceptPix(false);
    setAcceptCash(false);
    setAcceptCard(false);
    setAcceptDeposit(false);
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content px={8} pt={4} pb={10}>
        <HStack w="100%" justifyContent="space-between" mt={4}>
          <Text color="gray.100" fontFamily="heading" fontSize="lg">
            Filtrar anúncios
          </Text>
          <Pressable>
            <Icon as={<AntDesign name="close" />} color="gray.400" size={6} />
          </Pressable>
        </HStack>

        <Box w="100%" alignItems="flex-start" mt={8}>
          <Text fontFamily="heading" fontSize="md" mb={4}>
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
                    alignSelf="flex-end"
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
                    alignSelf="flex-end"
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

        <Box w="100%" alignItems="flex-start" mt={8}>
          <Text fontFamily="heading" fontSize="md" mb={4}>
            Aceita troca?
          </Text>
          <Switch
            offTrackColor="gray.500"
            onTrackColor="blue.light"
            onThumbColor="gray.700"
            offThumbColor="gray.700"
            value={acceptTrade}
            onValueChange={(e) => setAcceptTrade(e)}
          />
        </Box>

        <Box w="100%" alignItems="flex-start" mt={8}>
          <Text fontFamily="heading" fontSize="md" mb={4}>
            Meios de pagamento aceitos
          </Text>
          <Checkbox
            my={2}
            size="md"
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
            Boleto
          </Checkbox>
          <Checkbox
            my={2}
            size="md"
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
            Pix
          </Checkbox>
          <Checkbox
            my={2}
            size="md"
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
            Dinheiro
          </Checkbox>
          <Checkbox
            my={2}
            size="md"
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
            Cartão de Crédito
          </Checkbox>
          <Checkbox
            my={2}
            size="md"
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
            Depósito Bancário
          </Checkbox>
        </Box>

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

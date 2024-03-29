import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, Text } from "native-base";

const iconName = (type: string) => {
  switch (type) {
    case "card":
      return "card-outline";
    case "deposit":
      return "briefcase-outline";
    case "cash":
      return "cash-outline";
    case "pix":
      return "qr-code-outline";
    case "boleto":
      return "barcode-outline";
    default:
      break;
  }
};

type Props = {
  id: string;
  name: string;
};

export const PaymentMethodsIcon = ({ id, name }: Props) => {
  let methodName = name;
  console.log(name);
  switch (name) {
    case "pix":
      methodName = "Pix";
      break;
    case "deposit":
      methodName = "Depósito Bancário";
      break;
    case "cash":
      methodName = "Dinheiro";
      break;
    case "card":
      methodName = "Cartão de Crédito";
      break;
    case "boleto":
      methodName = "Boleto";
      break;
    default:
      break;
  }
  return (
    <HStack key={id} space={1} mt={1} alignItems="center">
      <Icon as={<Ionicons name={iconName(id)} />} color="gray.200" size="sm" />
      <Text color="gray.200" mb={1}>
        {methodName}
      </Text>
    </HStack>
  );
};

import { Box, IBoxProps, Checkbox, Text } from "native-base";
import { useState } from "react";

type Props = IBoxProps & {
  paymentMethods: string[];
  setPaymentMethods: (value: string[]) => void;
};

export const PaymentMethodsCheckbox = ({
  paymentMethods,
  setPaymentMethods,
  ...rest
}: Props) => {
  return (
    <Box w="100%" alignItems="flex-start" {...rest}>
      <Text fontFamily="heading" fontSize="md" mb={2}>
        Meios de pagamento aceitos
      </Text>
      <Checkbox.Group onChange={setPaymentMethods} value={paymentMethods}>
        <Checkbox
          my={1}
          size="sm"
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
          my={1}
          size="sm"
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
          Pix
        </Checkbox>
        <Checkbox
          my={1}
          size="sm"
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
          Dinheiro
        </Checkbox>
        <Checkbox
          my={1}
          size="sm"
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
          Cartão de Crédito
        </Checkbox>
        <Checkbox
          my={1}
          size="sm"
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
          Depósito Bancário
        </Checkbox>
      </Checkbox.Group>
    </Box>
  );
};

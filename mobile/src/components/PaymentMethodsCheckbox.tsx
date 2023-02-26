import { Box, IBoxProps, Checkbox, Text } from "native-base";
import { useState } from "react";

type Props = IBoxProps & {};

export const PaymentMethodsCheckbox = ({ ...rest }: Props) => {
  const [acceptBoleto, setAcceptBoleto] = useState(false);
  const [acceptPix, setAcceptPix] = useState(false);
  const [acceptCash, setAcceptCash] = useState(false);
  const [acceptCard, setAcceptCard] = useState(false);
  const [acceptDeposit, setAcceptDeposit] = useState(false);

  return (
    <Box w="100%" alignItems="flex-start" {...rest}>
      <Text fontFamily="heading" fontSize="md" mb={2}>
        Meios de pagamento aceitos
      </Text>
      <Checkbox
        my={1}
        size="sm"
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
        my={1}
        size="sm"
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
        my={1}
        size="sm"
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
        my={1}
        size="sm"
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
        my={1}
        size="sm"
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
  );
};

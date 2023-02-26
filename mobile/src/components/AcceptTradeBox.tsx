import { Box, IBoxProps, Switch, Text } from "native-base";
import { useState } from "react";

type Props = IBoxProps & {};

export const AcceptTradeBox = ({ ...rest }: Props) => {
  const [acceptTrade, setAcceptTrade] = useState(false);

  return (
    <Box w="100%" alignItems="flex-start" {...rest}>
      <Text fontFamily="heading" fontSize="md" mb={2}>
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
  );
};

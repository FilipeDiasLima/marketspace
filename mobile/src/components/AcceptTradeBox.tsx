import { Box, IBoxProps, Switch, Text } from "native-base";
import { useState } from "react";

type Props = IBoxProps & {
  acceptTrade: boolean;
  setAcceptTrade: (value: boolean) => void;
};

export const AcceptTradeBox = ({
  acceptTrade,
  setAcceptTrade,
  ...rest
}: Props) => {
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

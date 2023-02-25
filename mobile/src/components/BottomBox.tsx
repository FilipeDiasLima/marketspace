import { HStack } from "native-base";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const BottomBox = ({ children }: Props) => {
  return (
    <HStack space={4} p={6} alignItems="center" bg="gray.700">
      {children}
    </HStack>
  );
};

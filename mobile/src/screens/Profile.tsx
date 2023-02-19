import { Button } from "@components/Button";
import { Text, VStack } from "native-base";
import { useState } from "react";

export default function Profile() {
  const [theme, setTheme] = useState(false);
  return (
    <VStack>
      <Text>Profile</Text>
    </VStack>
  );
}

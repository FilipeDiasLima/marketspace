import { useAuth } from "@hooks/useAuth";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];
  theme.colors.text = colors.gray[200];

  return (
    <Box flex={1} pt={10} bg="gray.600">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};

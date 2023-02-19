import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import { Loading } from "@components/Loading";
import { Routes } from "./src/routes";
import { Theme } from "./src/theme";
import { AuthContextProvider } from "@context/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={Theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

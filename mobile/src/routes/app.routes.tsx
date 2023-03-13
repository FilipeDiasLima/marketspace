import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import EditProduct from "@screens/EditProduct";
import Home from "@screens/Home";
import Logout from "@screens/Logout";
import MyProducts from "@screens/MyProducts";
import NewProduct from "@screens/NewProduct";
import ProductDetails from "@screens/ProductDetails";
import ProductPreview from "@screens/ProductPreview";
import { useTheme } from "native-base";
import { Platform } from "react-native";

type TabRoutes = {
  home: undefined;
  myProducts: undefined;
  profile: undefined;
  logout: undefined;
};

type AppRoutes = {
  home: undefined;
  productDetails: { productId: string; isMine?: boolean };
  productPreview: { product: string; edit?: boolean };
  editProduct: { productId: string };
  newProduct: undefined;
};

export type AppTabNavigationRoutesProps = BottomTabNavigationProp<TabRoutes>;
export type AppStackNavigationRoutesProps =
  NativeStackNavigationProp<AppRoutes>;

const Tab = createBottomTabNavigator<TabRoutes>();
const Stack = createNativeStackNavigator<AppRoutes>();

function AppTabs() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[7];

  return (
    <Tab.Navigator
      initialRouteName="home"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 70 : 100,
          paddingBottom: Platform.OS === "android" ? sizes[4] : sizes[10],
          paddingTop: Platform.OS === "android" ? sizes[4] : sizes[6],
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="myProducts"
        component={MyProducts}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="tagso" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="logout"
        component={Logout}
        options={{
          tabBarIcon: () => (
            <Ionicons name="exit-outline" color="#EE7979" size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={AppTabs} />
      <Stack.Screen name="productDetails" component={ProductDetails} />
      <Stack.Screen name="newProduct" component={NewProduct} />
      <Stack.Screen name="productPreview" component={ProductPreview} />
      <Stack.Screen name="editProduct" component={EditProduct} />
    </Stack.Navigator>
  );
}

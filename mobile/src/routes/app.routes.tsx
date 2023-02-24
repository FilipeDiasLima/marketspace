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
import Home from "@screens/Home";
import Logout from "@screens/Logout";
import MyProducts from "@screens/MyProducts";
import ProductDetails from "@screens/ProductDetails";
import Profile from "@screens/Profile";
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
  productDetails: { productId: string };
};

export type AppTabNavigationRoutesProps = BottomTabNavigationProp<TabRoutes>;
export type AppStackNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const Tab = createBottomTabNavigator<TabRoutes>();
const Stack = createNativeStackNavigator<AppRoutes>();

function AppTabs() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[7];

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 100,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
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
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={iconSize} />
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
    </Stack.Navigator>
  );
}

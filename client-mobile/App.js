import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import HomePage from "./pages/HomePage";
import Detail from "./pages/DetailPage";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} options={{ headerTitle: (props) => <Text {...props} style={{ fontWeight: "bold", fontSize: 20 }} />, headerStyle: { height: 900 }, headerTitleAlign: "center" }} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "HomeMain") {
                iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
              } else if (route.name === "Detail") {
                iconName = focused ? "cloud" : "cloud-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="HomeMain" options={{ headerShown: false }} component={HomeStack} />
          <Tab.Screen name="Detail" component={Detail} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

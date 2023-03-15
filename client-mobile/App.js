import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import client from "./config/graphql";

import Ionicons from "react-native-vector-icons/Ionicons";

import HomePage from "./pages/HomePage";
import Detail from "./pages/DetailPage";
import Shipping from "./pages/ShippingArg";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <ApolloProvider client={client}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={{ headerTitle: (props) => <Text {...props} style={{ fontWeight: "bold", fontSize: 20 }} />, headerStyle: { height: 900 }, headerTitleAlign: "center" }} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </ApolloProvider>
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

              if (route.name === "Main Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Shipping") {
                iconName = focused ? "information-circle" : "information-circle-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Main Home" options={{ headerShown: false }} component={HomeStack} />
          <Tab.Screen name="Shipping" component={Shipping} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

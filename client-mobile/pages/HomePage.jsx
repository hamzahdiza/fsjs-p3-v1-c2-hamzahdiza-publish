import { FlatList, StatusBar, StyleSheet, TouchableOpacity, ScrollView, Image, View } from "react-native";
import SpecifiedView from "../components/SpecifiedView";
import { Avatar, Button, Card, Searchbar, Text } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import { Appbar } from "react-native-paper";
import { useQuery, gql } from "@apollo/client";
import ProductCard from "../components/ProductCard";
import { GET_ALL_PRODUCTS } from "../query";

const HomePage = ({ navigation }) => {
  const textOnPress = (officialName) => {
    console.log(officialName);
    navigation.navigate("Detail", {
      officialName,
    });
  };

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  console.log(error);

  if (loading) return <Image source={require("../assets/preloader-assets.gif")} style={{ alignSelf: "center" }} />;
  if (error) return <Text>Error {error.message}</Text>;
  return (
    <SpecifiedView>
      <ScrollView>
        <View style={{ margin: 5, padding: 10 }}>
          <Searchbar placeholder="Search Products" />
          <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            {data?.getAllProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SpecifiedView>
  );
};

export default HomePage;

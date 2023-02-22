import { FlatList, StatusBar, StyleSheet, TouchableOpacity, ScrollView, Image, View } from "react-native";
import SpecifiedView from "../components/SpecifiedView";
import { Avatar, Button, Card, Text } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import { Appbar } from "react-native-paper";
import ProductCard from "../components/ProductCard";

const HomePage = ({ navigation }) => {
  const textOnPress = (officialName) => {
    console.log(officialName);
    navigation.navigate("Detail", {
      officialName,
    });
  };

  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <SpecifiedView>
      <ScrollView>
        {/* <Text>HSDfmdlsd</Text>
        <TouchableOpacity onPress={() => textOnPress("tshirt")}>
          <Text>Ini halaman home</Text>
        </TouchableOpacity> */}

        <Appbar.Header>
          {/* <Appbar.BackAction onPress={_goBack} /> */}
          <Appbar.Content title="Home" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>

        <View style={{ margin: 5, padding: 10 }}>
          <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", width: "100%" }}>
            <ProductCard />
            <ProductCard />
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SpecifiedView>
  );
};

export default HomePage;

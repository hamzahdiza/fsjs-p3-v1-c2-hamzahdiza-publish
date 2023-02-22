import { StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import SpecifiedView from "../components/SpecifiedView";

const Detail = ({ route, navigation }) => {
  // const { officialName } = route.params;

  const buttonOnPressHandler = () => {
    navigation.goBack();
  };

  return (
    <SpecifiedView style={styles.centerContainer}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://cdn.shopify.com/s/files/1/0607/2841/0296/products/Hoodie-Giulio-Maroon-1.jpg?v=1676874548",
        }}
      />
      <Text style={styles.headers}>Erigo T-Shirt Navy</Text>
      <Text style={styles.container}>Description: asdadadsdfksmlkfmlsmglndsjfbnjkdnjownrofjowg</Text>

      <TouchableOpacity onPress={buttonOnPressHandler}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </SpecifiedView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headers: {
    padding: 8.0,
    paddingHorizontal: 16.0,
    fontSize: 24.0,
  },
  container: {
    paddingHorizontal: 16.0,
  },
  tinyLogo: {
    width: 64,
    height: 42,
  },
});

export default Detail;

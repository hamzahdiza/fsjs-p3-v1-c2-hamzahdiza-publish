import { View } from "react-native";
import { Avatar, Card, Text, Button } from "react-native-paper";
import SpecifiedView from "../components/SpecifiedView";

const Detail = ({ route, navigation }) => {
  // const { officialName } = route.params;

  // const buttonOnPressHandler = () => {
  //   navigation.goBack();
  // };

  return (
    <SpecifiedView>
      <View style={{ width: "100%", height: "100%", backgroundColor: "pink" }}>
        <View style={{ width: "100%", height: "100%", flexDirection: "row", justifyContent: "center" }}>
          <Card style={{ backgroundColor: "#fff", width: "90%", height: "97%", marginTop: 10 }} onPress={() => textOnPress()}>
            <View style={{ alignItems: "center" }}>
              <Card.Cover source={{ uri: "https://cdn.shopify.com/s/files/1/0607/2841/0296/products/Hoodie-Giulio-Maroon-1.jpg?v=1676874548" }} style={{ width: "93%", height: 350, marginTop: 7 }} />
            </View>
            <Card.Content>
              <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 24 }}>Card title</Text>
              <Text style={{ color: "#fe7f6c", fontSize: 16 }}>Rp. 150.000 </Text>
            </Card.Content>

            <Button icon="camera" mode="contained" onPress={() => console.log("Pressed")}>
              Press me
            </Button>
          </Card>
        </View>
      </View>
    </SpecifiedView>
  );
};

export default Detail;

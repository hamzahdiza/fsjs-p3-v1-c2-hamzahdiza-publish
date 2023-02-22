import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import SpecifiedView from "../components/SpecifiedView";

const ProductCard = ({}) => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  return (
    <>
      <Card style={{ backgroundColor: "#fff", width: "43%", height: 280, marginTop: 10 }}>
        <View style={{ alignItems: "center" }}>
          <Card.Cover source={{ uri: "https://cdn.shopify.com/s/files/1/0607/2841/0296/products/Hoodie-Giulio-Maroon-1.jpg?v=1676874548" }} style={{ width: "93%", marginTop: 7 }} />
        </View>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginTop: 6 }}>
            Card title
          </Text>
          <Text variant="bodyLarge" style={{ color: "#fe7f6c" }}>
            Rp. 150.000{" "}
          </Text>
        </Card.Content>
      </Card>
    </>
  );
};

export default ProductCard;

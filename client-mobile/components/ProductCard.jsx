import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ product }) => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  const navigation = useNavigation();

  const summaryName = () => {
    return product.name?.length > 30 ? product?.name?.substring(0, 30) + "..." : product.name;
  };

  const textOnPress = (slugProduct) => {
    // console.log(slugProduct);
    navigation.navigate("Detail", {
      slugProduct,
    });
  };
  return (
    <>
      <Card style={{ backgroundColor: "#fff", width: "45%", height: 300, marginTop: 10, marginHorizontal: 8 }} onPress={() => textOnPress(product.slug)}>
        <View style={{ alignItems: "center" }}>
          <Card.Cover source={{ uri: product.mainImg }} style={{ width: "93%", marginTop: 7 }} />
        </View>
        <Card.Content>
          <Text style={{ marginTop: 6, fontSize: 14, fontWeight: "bold" }}>{summaryName()}</Text>
          <Text variant="bodyLarge" style={{ color: "#fe7f6c" }}>
            Rp. {product?.price}
          </Text>
        </Card.Content>
      </Card>
    </>
  );
};

export default ProductCard;

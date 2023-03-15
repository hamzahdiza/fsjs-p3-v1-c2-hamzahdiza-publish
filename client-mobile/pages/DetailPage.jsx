import { View, Image, ScrollView } from "react-native";
import { Avatar, Card, Text, Button } from "react-native-paper";
import SpecifiedView from "../components/SpecifiedView";
import { useQuery, gql } from "@apollo/client";
import { GET_PRODUCT_BY_SLUG } from "../query";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";

const Detail = ({ route, navigation }) => {
  const { slugProduct } = route.params;
  console.log(slugProduct, "<<<<<<");

  // const buttonOnPressHandler = () => {
  //   navigation.goBack();
  // };

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: {
      slugProduct: slugProduct,
    },
  });

  console.log(error);
  console.log(data?.getProductBySlug?.User.username);

  if (loading) {
    return <Image source={require("../assets/preloader-assets.gif")} style={{ alignSelf: "center" }} />;
  }
  if (error) return <Text>Error {error.message}</Text>;
  return (
    <SpecifiedView>
      <ScrollView>
        <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
          <View style={{ width: "100%", height: "100%", backgroundColor: "#e6e6e6", flexDirection: "row", justifyContent: "center", ...styles.shadow }}>
            <Card style={{ backgroundColor: "white", width: "90%", height: "97%", marginTop: 10 }}>
              <View style={{ alignItems: "center" }}>
                <Card.Cover source={{ uri: data?.getProductBySlug?.mainImg }} style={{ width: "93%", height: 350, marginTop: 7 }} />
              </View>

              <View style={{ marginTop: -30, marginHorizontal: 10, flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly" }}>
                {data?.getProductBySlug?.Images?.map((image) => {
                  return (
                    <Text key={image.id}>
                      <Image source={{ uri: image.imgUrl }} style={{ width: 90, height: 90 }} />
                    </Text>
                  );
                })}
              </View>

              <Card.Content style={{ marginBottom: 20 }}>
                <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 24 }}>{data?.getProductBySlug?.name}</Text>
                <Text style={{ color: "#fe7f6c", fontSize: 24, marginTop: 7 }}>
                  Rp.{" "}
                  {data?.getProductBySlug?.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Text>

                <View>
                  <Text style={{ fontSize: 16, textAlign: "justify", marginTop: 15 }}>{data?.getProductBySlug?.description}</Text>
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>Category: {data?.getProductBySlug?.Category?.name}</Text>
                </View>

                <View>
                  <Text>Admin: {data?.getProductBySlug?.User?.username}</Text>
                </View>

                <Button style={{ marginTop: 10, backgroundColor: "#202020" }} icon="cart" mode="contained" onPress={() => console.log("Pressed")}>
                  Add to Cart
                </Button>

                <View>
                  <View style={{ marginTop: 7 }}>
                    <Image style={{ width: "100%", height: 55 }} source={{ uri: "https://cdn.shopify.com/s/files/1/0607/2841/0296/files/Guarantee_banner.png?v=1649666846" }} />
                  </View>
                  <View>
                    <View style={{ padding: 7, flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
                      <View style={{}}>
                        <Text>
                          <Ionicons name={"pricetags"} size={25} color={"black"} />
                        </Text>
                      </View>
                      <Text style={{ textAlignVertical: "center", fontWeight: "bold", marginLeft: 8 }}>Gratis Ongkir</Text>
                      <View style={{ marginLeft: 32 }}>
                        <Text>Gratis Ongkir dengan min. belanja Rp 1.500.000</Text>
                      </View>
                    </View>

                    <View style={{ padding: 7, flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
                      <View style={{}}>
                        <Text>
                          <Ionicons name={"shield-checkmark"} size={25} color={"black"} />
                        </Text>
                      </View>
                      <Text style={{ textAlignVertical: "center", fontWeight: "bold", marginLeft: 8 }}>Proteksi kerusakan produk</Text>
                      <View style={{ marginLeft: 32 }}>
                        <Text>Jaminan produk diterima dalam keadaan baik </Text>
                      </View>
                    </View>

                    <View style={{ padding: 7, flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
                      <View style={{}}>
                        <Text>
                          <Ionicons name={"eye"} size={25} color={"black"} />
                        </Text>
                      </View>
                      <Text style={{ textAlignVertical: "center", fontWeight: "bold", marginLeft: 8 }}>38 customers are viewing this product</Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SpecifiedView>
  );
};

const styles = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
};

export default Detail;

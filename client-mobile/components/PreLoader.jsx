import { View } from "react-native";
const PreLoader = ({ product }) => {
  const navigation = useNavigation();

  return (
    <>
      <View id="loader-page"></View>
      <View id="preloader">
        <View class="loading">
          <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_3QexPM.json" background="transparent" speed="2" style="width: 300px; height: 300px" loop autoplay></lottie-player>
        </View>
      </View>
    </>
  );
};

export default PreLoader;

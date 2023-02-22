import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SpecifiedView = ({ children, style }) => {
  return Platform.OS === "android" ? <SafeAreaView style={style}>{children}</SafeAreaView> : <View style={style}>{children}</View>;
};

export default SpecifiedView;

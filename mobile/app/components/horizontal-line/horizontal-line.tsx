import { View, StyleSheet } from "react-native";
import AppTheme from "../../helpers/theme";

export default function HorizonatalLine() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1,
    backgroundColor: AppTheme.colors.black,
    opacity: 0.5,
    marginTop: 8,
    marginHorizontal: 5,
  },
});

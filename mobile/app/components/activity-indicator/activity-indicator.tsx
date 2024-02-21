import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import AppTheme from "../../helpers/theme";

export default function WaitIndicator({ show = false }) {
  if (show) {
    return (
      <>
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color={AppTheme.colors.black}
            style={styles.indicator}
          />
          <Text style={styles.text}>Please wait...</Text>
        </View>
      </>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: AppTheme.colors.white,
    opacity: 0.8,
  },
  indicator: {
    top: "60%",
    opacity: 1,
  },
  text: {
    alignSelf: "center",
    top: "60%",
    opacity: 1,
  },
});

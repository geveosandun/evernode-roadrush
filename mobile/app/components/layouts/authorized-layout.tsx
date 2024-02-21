import { LinearGradient } from "react-native-linear-gradient";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AppTheme from "../../helpers/theme";
import React from "react";
import WaitIndicator from "../activity-indicator/activity-indicator";

export default function AuthorizedLayout({
  children,
  showWaitIndicator = false,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.scrollView}
        // contentContainerStyle={styles.scrollViewContentContainer}
      >
        <LinearGradient
          colors={[AppTheme.colors.white, AppTheme.colors.white]}
          style={styles.screenBackground}
        >
          <WaitIndicator show={showWaitIndicator} />
          {children}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  screenBackground: {
    width: "100%",
    height: "100%",
  },
});

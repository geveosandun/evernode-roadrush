import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import AppTheme from "../../helpers/theme";
import WaitIndicator from "../activity-indicator/activity-indicator";

export default function AnonymousLayout({
  children,
  showWaitIndicator = false,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>
        <LinearGradient
          colors={[AppTheme.colors.white, AppTheme.colors.white]}
          style={styles.screenBackground}
        >
          <WaitIndicator show={showWaitIndicator} />
          {children}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    
  },
  scrollViewContentContainer:{
    flexGrow:1
  },
  screenBackground: {
    width: "100%",
    height: "100%",
    paddingTop:0,
    paddingRight:15,
    paddingBottom:20,
    paddingLeft:15
  },
});

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import WaitIndicator from '../components/activity-indicator/activity-indicator';
import AppTheme from '../helpers/theme';

export default function AnonymousLayout({children, showWaitIndicator = false}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={AppTheme.specification.colors.primary}
        animated={true}
        hidden={false}
        translucent={false}
        networkActivityIndicatorVisible={true}
        barStyle={'default'}
      />
      <Toast />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
        scrollEnabled={true}>
        <LinearGradient
          colors={[
            AppTheme.specification.colors.white,
            AppTheme.specification.colors.white,
          ]}
          style={styles.screenBackground}>
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
    alignContent: 'center',
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  screenBackground: {
    width: '100%',
    height: '100%',
    paddingTop: 0,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 15,
  },
});

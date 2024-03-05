import {LinearGradient} from 'react-native-linear-gradient';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import AppTheme from '../helpers/theme';
import WaitIndicator from '../components/activity-indicator/activity-indicator';
import {HeaderBar} from '../components/header-bar/header-bar';
import RRBottomNavigationBar, {
  BottomNavigationButtons,
} from '../components/bottom-navigation-bar/bottom-navigation-bar';
import Toast from 'react-native-root-toast';

export default function AuthorizedLayoutWithoutScroll({
  navigation,
  children,
  showWaitIndicator = false,
  title = '',
  showBottomNavigation = false,
  selectedBottomNavigationTab = BottomNavigationButtons.Home,
}) {
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

      <View>
        <LinearGradient
          colors={[
            AppTheme.specification.colors.white,
            AppTheme.specification.colors.white,
          ]}
          style={styles.screenBackground}>
          <HeaderBar title={title} showBackArrow={false} navigation />
          <WaitIndicator show={showWaitIndicator} />
          <View
            style={styles.scrollView}
           // keyboardShouldPersistTaps={'handled'}
            >
            {children}
          </View>

          {showBottomNavigation && (
            <RRBottomNavigationBar
              selectedTab={selectedBottomNavigationTab}
              navigation={navigation}
            />
          )}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    // flexDirection: 'column',
    flexGrow: 1,
    marginBottom: 75,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  screenBackground: {
    width: '100%',
    height: '100%',
  },
});

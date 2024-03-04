import {faHome, faTaxi, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppTheme from '../../helpers/theme';
import React from 'react';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
export enum BottomNavigationButtons {
  Home,
  Trips,
  Account,
}

export default function RRBottomNavigationBar({
  navigation,
  selectedTab = BottomNavigationButtons.Home,
  onTapCallback = null,
}): React.JSX.Element {
  async function onTap(tappedTab: BottomNavigationButtons) {
    let allowNavigation = true;

    if (onTapCallback) {
      allowNavigation = await onTapCallback(tappedTab);
    }

    if (allowNavigation) {
      switch (tappedTab) {
        case BottomNavigationButtons.Trips:
          navigation.navigate('trips');
          break;

        case BottomNavigationButtons.Account:
          navigation.navigate('wallet');
          break;

        case BottomNavigationButtons.Home:
        default:
          navigation.navigate('usermodeselection');
          break;
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View
          style={[
            styles.actionButton,
            selectedTab == BottomNavigationButtons.Home
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Home);
            }}>
            <FontAwesomeIcon icon={faHome} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.actionButton,
            selectedTab == BottomNavigationButtons.Trips
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Trips);
            }}>
            <FontAwesomeIcon icon={faTaxi} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.actionButton,
            selectedTab == BottomNavigationButtons.Account
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Account);
            }}>
            <FontAwesomeIcon icon={faUser} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
  },
  navbar: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    backgroundColor: AppTheme.specification.colors.white,
    borderTopWidth: 2,
    borderTopColor: AppTheme.specification.colors.primary,
    height: 90,
    width: screenWidth,
    elevation: 10,
  },
  actionButton: {
    alignSelf: 'center',
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: screenWidth / 4,
  },
  activeActionButton: {
    backgroundColor: AppTheme.specification.colors.backgroundShade,
    borderRadius: 50,
  },
  inactiveActionButton: {
    opacity: 0.3,
  },
});

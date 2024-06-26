import {faHome, faListUl, faTaxi, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppTheme from '../../helpers/theme';
import React from 'react';
import {Dimensions} from 'react-native';
import AppSecureStorageService from '../../services/secure-storage-service';

const screenWidth = Dimensions.get('window').width;
export enum BottomNavigationButtons {
  Home,
  Trips,
  Profile,
  Wallet,
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
          let activeUser = await AppSecureStorageService.getItem('user');
          let activeUserId = JSON.parse(activeUser).UserID;
          let loggedInAs = await AppSecureStorageService.getItem('loggedInAs');
          navigation.navigate('trips', {
            userId: activeUserId,
            ongoingTrips: {},
            user: activeUser,
            loggedInAs: loggedInAs,
          });
          break;

        case BottomNavigationButtons.Profile:
          navigation.navigate('profile');
          break;

        case BottomNavigationButtons.Wallet:
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
            selectedTab == BottomNavigationButtons.Wallet
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Wallet);
            }}>
            <FontAwesomeIcon icon={faListUl} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.actionButton,
            selectedTab == BottomNavigationButtons.Profile
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Profile);
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

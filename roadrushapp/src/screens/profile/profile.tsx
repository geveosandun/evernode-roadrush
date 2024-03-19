import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import RRButton from '../../components/button/button';
import {LocalStorageKeys} from '../../helpers/constants';
import DeviceHelper from '../../helpers/device-helper';
import AppTheme from '../../helpers/theme';
import AuthorizedLayout from '../../layouts/authorized-layout';
import AuthService from '../../services/auth-service';
import AppSecureStorageService from '../../services/secure-storage-service';
import XummApiService from '../../services/xumm-api-service';

export function Profile({navigation}): React.JSX.Element {
  const _authService = AuthService.getInstance();

  const [profileLogo, setProfileLogo] = useState('');
  const [profileRAddress, setProfileRAddress] = useState('');

  useEffect(() => {
    const xumm = new XummApiService();
    xumm.init().then(() => {
      AppSecureStorageService.getItem(LocalStorageKeys.xrpAddress).then(
        rAddress => {
          if (rAddress) {
            xumm.getAccountProfile(rAddress).then(profile => {
              setProfileLogo(profile.data.avatar);
              setProfileRAddress(profile.data.account);
            });
          }
        },
      );
    });
  }, []);

  const handleLogout = () => {
    _authService.submitLogoutRequest().then((resposne: any) => {
      if (resposne) {
        navigation.navigate('login');
      }
    });
  };

  return (
    <AuthorizedLayout
      navigation={navigation}
      showBottomNavigation={true}
      selectedBottomNavigationTab={BottomNavigationButtons.Profile}
      title="Profile">
      <View style={styles.profileContainer}>
        {profileLogo.length > 0 ? (
          <Image style={styles.profileImage} src={profileLogo} />
        ) : (
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/profile_picture.png')}
          />
        )}
        <Text style={styles.accountAddressText}>{profileRAddress}</Text>
      </View>
      <View style={styles.evernodeContainer}>
        <Text style={styles.poweredByText}>Powered by:</Text>
        <Image
          style={styles.evernodeLogo}
          source={require('../../assets/images/evernode.png')}
        />
      </View>
      <View style={styles.button_bar}>
        <RRButton
          showLeftArrow={false}
          showRightArrow={false}
          text="Logout"
          onTap={handleLogout}
        />
      </View>
      <Text style={styles.versionText}>Version {DeviceHelper.appVersion}</Text>
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  profileContainer: {},
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppTheme.specification.colors.mediumGrey,
    alignSelf: 'center',
    marginTop: 20,
  },
  accountAddressText: {
    alignSelf: 'center',
    fontSize: 18,
    color: AppTheme.specification.colors.darkGrey,
    marginTop: 20,
  },
  evernodeContainer: {
    marginTop: 75,
  },
  poweredByText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: AppTheme.specification.colors.darkGrey,
  },
  evernodeLogo: {
    objectFit: 'contain',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  button_bar: {
    marginTop: 0,
  },
  versionText: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

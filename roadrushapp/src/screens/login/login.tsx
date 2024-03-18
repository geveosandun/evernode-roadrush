const xrpl = require('xrpl');
import {Image, StyleSheet, Text, Linking, View} from 'react-native';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {LocalStorageKeys, ToastMessageTypes} from '../../helpers/constants';
import {showToast} from '../../services/toast-service';
import AnonymousLayout from '../../layouts/anonymous-layout';
import AppSecureStorageService from '../../services/secure-storage-service';
import AppSettings from '../../helpers/app-settings';
import AuthService from '../../services/auth-service';
import React, {useState} from 'react';
import RRButton from '../../components/button/button';

export function Login({navigation}): React.JSX.Element {
  const _authService = AuthService.getInstance();

  const [showWaitIndicator, setShowWaitIndicator] = useState(false);

  Linking.addEventListener('url', async (event: {url: string}) => {
    // console.log('URL: ' + event.url);

    let u = new URL(event.url);
    let token = u.searchParams.get('access_token');
    // console.log('Token: ' + token);

    let jwtDecoded = jwtDecode<JwtPayload>(token);
    let xrpaddress = jwtDecoded.sub;
    _authService
      .submitLoginRequest(xrpaddress)
      .then(async (response: any) => {
        if (response) {
          showToast('Logged in successfully!', ToastMessageTypes.success);
          await AppSecureStorageService.setItem(
            LocalStorageKeys.xummJwtToken,
            token,
          );
          await AppSecureStorageService.setItem(
            LocalStorageKeys.xrpAddress,
            xrpaddress,
          );
          navigation.replace('usermodeselection');
        } else {
          showToast('Invalid Login', ToastMessageTypes.error);
        }
      })
      .catch(error => {
        console.log('Error', error);
      })
      .finally(() => {
        setShowWaitIndicator(false);
      });
  });

  const xummLogin = async () => {
    setShowWaitIndicator(true);
    Linking.openURL(
      `https://oauth2.xumm.app/auth?client_id=${AppSettings.xummApiKey}&redirect_uri=roadrush://login&scope=token&response_type=token&response_mode=query`,
    );
  };

  return (
    <AnonymousLayout showWaitIndicator={showWaitIndicator}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/images/logo.png')}
      />

      <View style={{marginBottom: 75}} />

      <RRButton
        onTap={() => xummLogin() /*submitLogin()*/}
        text="Login with Xaman"
        showRightArrow={true}
      />
      <View style={styles.geveoLogo} />
      <Text style={styles.versionText}>Version 0.0.1</Text>
    </AnonymousLayout>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    marginTop: '10%',
    marginBottom: '10%',
    alignSelf: 'center',
    objectFit: 'contain',
    width: '95%',
    height: '30%',
  },
  geveoLogo: {
    marginTop: '20%',
    alignSelf: 'center',
    objectFit: 'contain',
    width: '30%',
    height: '5%',
  },
  versionText: {
    marginTop: '2%',
    alignSelf: 'center',
  },
});

import React, {useState} from 'react';
import {TextInput, Image, StyleSheet, Text} from 'react-native';
import RRButton from '../../components/button/button';
import {ToastMessageTypes} from '../../helpers/constants';
import AppTheme from '../../helpers/theme';
import AnonymousLayout from '../../layouts/anonymous-layout';
import AuthService from '../../services/auth-service';
import {showToast} from '../../services/toast-service';
import { Wallet } from 'xrpl';
const xrpl = require("xrpl");

export function Login({navigation}): React.JSX.Element {
  const _authService = AuthService.getInstance();

  const [showWaitIndicator, setShowWaitIndicator] = useState(false);
  const [walletSecret, setWalletSecret] = useState('');

  const UrlConstants = {
    XRPL_URL: "wss://xahau-test.net/"
  };
  const xrplClient = new xrpl.Client(UrlConstants.XRPL_URL);

  const submitLogin = async () => {
    if (walletSecret !== '') {
      setShowWaitIndicator(true);
      await xrplClient.connect();

      const wallet = Wallet.fromSeed(walletSecret);
      if (wallet) {
        _authService.submitLoginRequest(wallet.publicKey)
          .then((response: any) => {
            if (response) {
              showToast('Logged in successfully!', ToastMessageTypes.success);
              navigation.replace('usermodeselection');
            } else {
              //Can implement routing to a register page
              showToast("Invalid Login", ToastMessageTypes.error);
            }
          })
          .catch((error) => {
            console.log('Error', error);
          })
          .finally(() => {
            setShowWaitIndicator(false);
          });
      } else {
        console.log("error", wallet);
        showToast("Invalid Login", ToastMessageTypes.error);
      }
    } else {
      showToast('Please provide a secret', ToastMessageTypes.error);
    }
  };

  return (
    <AnonymousLayout showWaitIndicator={showWaitIndicator}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/images/logo.png')}
      />

      <TextInput
        placeholder="Wallet Secret"
        style={AppTheme.components.textbox}
        value={walletSecret}
        onChangeText={(text) => setWalletSecret(text)}
      />

      <RRButton
        onTap={() => submitLogin()}
        text="Login"
        showRightArrow={true}
      />

      <Image
        style={styles.geveoLogo}
        source={require('../../assets/images/geveo.png')}
      />

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

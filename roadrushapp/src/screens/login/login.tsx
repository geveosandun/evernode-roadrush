import React, {useState} from 'react';
import {TextInput, Image, StyleSheet, Text} from 'react-native';
import RRButton from '../../components/button/button';
import {ToastMessageTypes} from '../../helpers/constants';
import AppTheme from '../../helpers/theme';
import AnonymousLayout from '../../layouts/anonymous-layout';
import AuthService from '../../services/auth-service';
import {showToast} from '../../services/toast-service';

export function Login({navigation}): React.JSX.Element {
  const _authService = AuthService.getInstance();

  const [showWaitIndicator, setShowWaitIndicator] = useState(false);
  const [walletSecret, setWalletSecret] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitLogin = () => {
    // test code
    setShowWaitIndicator(true);

    setTimeout(() => {
      setShowWaitIndicator(false);
      navigation.replace('usermodeselection');
    }, 1000);

    // const loginData = {
    //   Username: userName,
    //   Password: password,
    // };

    // _authService
    //   .submitLoginRequest(loginData)
    //   .then((response: any) => {
    //     if (response === 'Login Success') {
    //       showToast('Logged in successfully!', ToastMessageTypes.success);
    //       navigation.replace('SelectTypeScreen');
    //     }
    //   })
    //   .catch(error => {
    //     showToast(error.displayErrorMessage, ToastMessageTypes.error);
    //   })
    //   .finally(() => {
    //     setShowWaitIndicator(false);
    //   });
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
        onChangeText={text => setWalletSecret(text)}
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

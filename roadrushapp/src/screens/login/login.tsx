import React, {useState} from 'react';
import {TextInput, Image, StyleSheet, Text, Linking} from 'react-native';
import RRButton from '../../components/button/button';
import {LocalStorageKeys, ToastMessageTypes} from '../../helpers/constants';
import AppTheme from '../../helpers/theme';
import AnonymousLayout from '../../layouts/anonymous-layout';
import AuthService from '../../services/auth-service';
import {showToast} from '../../services/toast-service';
import {Wallet} from 'xrpl';
import XummApiService from '../../services/xumm-api-service';
import AppSecureStorageService from '../../services/secure-storage-service';
const xrpl = require('xrpl');

export function Login({navigation}): React.JSX.Element {
  const _authService = AuthService.getInstance();

  const [showWaitIndicator, setShowWaitIndicator] = useState(false);
  const [walletSecret, setWalletSecret] = useState('');

  const UrlConstants = {
    XRPL_URL: 'wss://xahau-test.net/',
  };
  const xrplClient = new xrpl.Client(UrlConstants.XRPL_URL);

  Linking.addEventListener('url', async (event: {url: string}) => {
    // console.log('URL: ' + event.url);

    let u = new URL(event.url);
    let token = u.searchParams.get('access_token');
    // console.log('Token: ' + token);
    await AppSecureStorageService.setItem(LocalStorageKeys.xummJwtToken, token);

    // todo: save the rAddress to database
    
    test(token);
  });

  const test = async (jwt?: string) => {
    const x = new XummApiService();
    await x.init();
    // console.log(await x.ping());

    await x.makePaymentRequest('rM9J9GskMWkDEU5yarJzYkqgXPwLQw4QqQ', '1');

    // let xumm = new Xumm(
    //   'ac9f5053-cf7a-41a4-b6a4-15531f05b822',
    //   'e3decdda-2d6f-435e-914f-632b344428b7',
    // );

    // console.log(xumm.runtime);

    // await axios
    //   .get('https://xumm.app/api/v1/platform/ping', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-API-Key': 'ac9f5053-cf7a-41a4-b6a4-15531f05b822',
    //       'X-API-Secret': 'e3decdda-2d6f-435e-914f-632b344428b7',
    //       accept: 'application/json',
    //     },
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });

    // xumm.on('success', async () => {
    //   try {
    //     console.log('Xumm!!!');

    //     let payload = await xumm.payload.create({
    //       TransactionType: 'SignIn',
    //       // TransactionType: 'Payment',
    //       // Destination: 'rM9J9GskMWkDEU5yarJzYkqgXPwLQw4QqQ', //driver address
    //       // Amount: '1',
    //     });

    //     console.log(payload.refs.websocket_status);

    //     // console.log('always: ' + payload.next.always);

    //     // console.log('payload: ' + payload);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });

    // console.log('account:', await xumm.user?.account);

    // console.log('ping@1', await xumm.ping());

    // console.log('rates', await xumm.helpers?.getRates('EUR'));

    // console.log('jwt', await xumm.environment?.jwt);
    // console.log('bearer', await xumm.environment?.bearer);
    // console.log('openid', await xumm.environment?.openid);
    // console.log('ott', await xumm.environment?.ott);

    // console.log(
    //   'payload',
    //   await xumm.payload?.create({TransactionType: 'SignIn'}),
    // );
  };

  const xummLogin = async () => {
    // test();
    Linking.openURL(
      'https://oauth2.xumm.app/auth?client_id=ac9f5053-cf7a-41a4-b6a4-15531f05b822&redirect_uri=roadrush://login&scope=token&response_type=token&response_mode=query',
    );

    // const x = new Xumm(
    //   'ac9f5053-cf7a-41a4-b6a4-15531f05b822',
    //   // 'e3decdda-2d6f-435e-914f-632b344428b7',
    // );

    // const d = await Linking.getInitialURL();
    // console.log(d);

    // https://oauthdebugger.com/debug
    // intent:#Intent;scheme=roadrush;package=com.roadrush;end
    // let response = await Linking.openURL(
    //   'https://oauth2.xumm.app/auth?client_id=ac9f5053-cf7a-41a4-b6a4-15531f05b822&redirect_uri=roadrush://usermodeselection&scope=token&response_type=token&response_mode=query',
    // );
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(e => {
    //   console.log(e);
    // });

    // await x.ping().then(r => console.log('pong: ' + r));

    // await x.authorize();
    // .then((res: any) => {
    //   console.log('Response: ' + res);
    // })
    // .catch((err: any) => {
    //   console.log('Error: ' + err);
    // });

    // x.environment.jwt?.then(r => console.log('jwt', r));
    // x.environment.bearer?.then(r => console.log('bearer', r));
    // x.environment.openid?.then(r => console.log('openid', r));
    // x.environment.ott?.then(r => console.log('ott', r));
  };

  const submitLogin = async () => {
    if (walletSecret !== '') {
      setShowWaitIndicator(true);
      await xrplClient.connect();

      const wallet = Wallet.fromSeed(walletSecret);
      if (wallet) {
        _authService
          .submitLoginRequest(wallet.publicKey)
          .then((response: any) => {
            if (response) {
              showToast('Logged in successfully!', ToastMessageTypes.success);
              navigation.replace('usermodeselection');
            } else {
              //Can implement routing to a register page
              showToast('Invalid Login', ToastMessageTypes.error);
            }
          })
          .catch(error => {
            console.log('Error', error);
          })
          .finally(() => {
            setShowWaitIndicator(false);
          });
      } else {
        console.log('error', wallet);
        showToast('Invalid Login', ToastMessageTypes.error);
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
        onChangeText={text => setWalletSecret(text)}
      />

      <RRButton
        onTap={() => xummLogin() /*submitLogin()*/}
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

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, BackHandler} from 'react-native';
import AnonymousLayout from '../../layouts/anonymous-layout';
import AuthService from '../../services/auth-service';
import HotPocketClientService from '../../services/hp-client-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  
  useEffect(() => {
    HotPocketClientService.getInstance().then(ins => {
      console.log(ins);
    });

    AuthService.checkAuthentication().then( loggedIn => {
      if (loggedIn) {
        // setTimeout(() => {
        
        navigation.replace('usermodeselection');

        // }, 2000);
      } else {
        navigation.replace('login');
      }
    });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      },
    );

    return () => {
      if (backHandler.remove) {
        backHandler.remove();
      }
    };
  }, [navigation]);

  return (
    <>
      <AnonymousLayout showWaitIndicator={showLoadingIndicator}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/images/logo.png')}
        />
        <Image
          style={styles.geveoLogo}
          source={require('../../assets/images/geveo.png')}
        />
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.versionText}>Version 0.0.1</Text>
        </View>
      </AnonymousLayout>
    </>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    marginTop: '40%',
    alignSelf: 'center',
    objectFit: 'contain',
    width: '95%',
    height: '30%',
  },
  geveoLogo: {
    marginTop: '55%',
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

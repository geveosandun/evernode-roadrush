import React, { useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import RRButton from '../../components/button/button';
import {ToastMessageTypes} from '../../helpers/constants';
import AppTheme from '../../helpers/theme';
import AuthorizedLayout from '../../layouts/authorized-layout';
import {showToast} from '../../services/toast-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserModeSelection({navigation}): React.JSX.Element {
  const [user, setUser]= useState();

  useEffect( () =>{
    const fetchUser = async () => {
      try {
        const activeUser = await AsyncStorage.getItem('user');
        setUser(JSON.parse(activeUser));
        console.log("USER", JSON.parse(activeUser)); // Log the parsed user directly
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  },[])

  function gotoHomeScreen(mode: string) {
    switch (mode) {
      case 'passenger':
        navigation.navigate('passengerhome',{user});
        break;

      case 'driver':
        navigation.navigate('driverhome', {user});
        break;

      default:
        showToast('Invalid user mode selected.', ToastMessageTypes.error);
        break;
    }
  }

  return (
    <AuthorizedLayout navigation={navigation} title="Mode">
      <View style={styles.container}>
        <RRButton
          showRightArrow={true}
          text="Login as a Passenger"
          onTap={() => {
            gotoHomeScreen('passenger');
          }}
        />
        <View style={styles.space} />
        <RRButton
          showRightArrow={true}
          text="Login as a Driver"
          onTap={() => {
            gotoHomeScreen('driver');
          }}
        />
        {/* <Link to={'/passengerhome'} style={styles.linkButton}>
          <Text>Passenger</Text>
        </Link>

        <Link to={'/driverhome'} style={styles.linkButton}>
          <Text>Driver</Text>
        </Link> */}
      </View>
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
  },
  space: {
    height: 50,
  },
  linkButton: {
    padding: 20,
    margin: 50,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: AppTheme.specification.colors.primary,
    borderRadius: 10,
    minWidth: '50%',
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RRButton from '../../components/button/button';
import {ToastMessageTypes} from '../../helpers/constants';
import AppTheme from '../../helpers/theme';
import AuthorizedLayout from '../../layouts/authorized-layout';
import AppSecureStorageService from '../../services/secure-storage-service';
import {showToast} from '../../services/toast-service';
import ApiService from '../../services/api-service';

export default function UserModeSelection({navigation}): React.JSX.Element {
  const apiService = ApiService.getInstance();
  const [user, setUser] = useState();
  let userId = '';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let activeUser = await AppSecureStorageService.getItem('user');
        setUser(JSON.parse(activeUser));

        console.log('USER', JSON.parse(activeUser)); // Log the parsed user directly
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  async function gotoHomeScreen(mode: string) {
    let activeUser = await AppSecureStorageService.getItem('user');
    let activeUserId = JSON.parse(activeUser).UserID;
    console.log('UID***', activeUserId);
    switch (mode) {
      case 'passenger':
        apiService.getUserOngoingRides(activeUserId).then((response: any) => {
          console.log('Res P ', response);
          if (response.length >0) {
            navigation.navigate('trips', {
              userId: activeUserId,
              ongoingTrips: response,
              user: user,
              loggedInAs: 'passenger',
            });
          } else {
            navigation.navigate('passengerhome', {user});
          }
        });
        break;

      case 'driver':
        apiService.getUserOngoingRides(activeUserId).then((response: any) => {
          console.log('Res D ', response);
          if (response.length >0) {
            navigation.navigate('trips',{userId:activeUserId,ongoingTrips:response, user:user,  loggedInAs:'driver'})
          } else {
            navigation.navigate('driverhome', {user});
          }
        });
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
            AppSecureStorageService.setItem('loggedInAs', 'passenger');
            gotoHomeScreen('passenger');
          }}
        />
        <View style={styles.space} />
        <RRButton
          showRightArrow={true}
          text="Login as a Driver"
          onTap={() => {
            AppSecureStorageService.setItem('loggedInAs', 'driver');
            gotoHomeScreen('driver');
          }}
        />
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

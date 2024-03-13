import {StyleSheet, View, Text, Image} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import AuthorizedLayout from '../../layouts/authorized-layout';
import {useState} from 'react';
import RRButton from '../../components/button/button';
import AuthService from '../../services/auth-service';

export default function Trips({navigation}) {
  const _authService = AuthService.getInstance();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);


  async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
    console.log(tab);
    return true;
  }

 

  return (
    <AuthorizedLayout
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      selectedBottomNavigationTab={BottomNavigationButtons.Account}
      title='Ride History'>
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/images/profile_picture.png')}
          style={styles.image}></Image>
        <Text style={{fontSize: 25, marginTop: 25}}> John Doe</Text>
      </View>
      
       
     
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.2,
    flexDirection: 'row',
    margin: 10,
  },
  walletContainer: {
    flex: 0.2,
    margin: 20,
    backgroundColor: '#dee0de',
    padding: 10,
  },
  historyContainer: {
    flex: 0.5,
    margin: 20,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
  historyData: {
    fontSize: 16,
    marginBottom: 5,
  },
  historyItem: {
    marginBottom: 3,
  },
});

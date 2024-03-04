import {StyleSheet, View, Text, Image} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import AuthorizedLayout from '../../layouts/authorized-layout';
import {useState} from 'react';

export default function Wallet({navigation}) {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [walletHistory, setWalletHistory] = useState([
    '0.34 EVRs transfred to *******98 on 09/02/2024',
    '0.35 EVRs transfred to *******45 on 09/02/2024',
    '4.7 EVRs transfred to *******96 on 09/02/2024',
    '7.9 EVRs transfred to *******11 on 09/02/2024',
    '7.9 EVRs transfred to *******11 on 09/02/2024',
    '10.34 EVRs transfred to *******93 on 09/02/2024',
  ]);

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
      title='My Wallet'>
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/images/profile_picture.png')}
          style={styles.image}></Image>
        <Text style={{fontSize: 25, marginTop: 25}}> John Doe</Text>
      </View>
      <View style={styles.walletContainer}>
        <Text style={{fontSize: 20}}>EVRs Balance</Text>
        <Text style={{fontSize: 50, color: '#ab0a0a'}}>EVRs 270.67</Text>
      </View>
      <View style={styles.historyContainer}>
        <Text style={{marginBottom: 10, fontSize: 20, fontWeight: 'bold'}}>
          Wallet History
        </Text>
        {walletHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text key={index} style={styles.historyData}>
              {item}
            </Text>
          </View>
        ))}
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

import {StyleSheet, View, Text, Image} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import AuthorizedLayout from '../../layouts/authorized-layout';
import {useEffect, useState} from 'react';
import RRButton from '../../components/button/button';
import AuthService from '../../services/auth-service';
import XRPLService from '../../services/xrpl-service';
import ApiService from '../../services/api-service';
import AppTheme from '../../helpers/theme';

export default function Wallet({navigation}) {
  const _authService = AuthService.getInstance();
  const _xrplService = new XRPLService();
  const _apiService = ApiService.getInstance();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [walletHistory, setWalletHistory] = useState([
    '0.34 EVRs transfred to *******98 on 09/02/2024',
    '0.35 EVRs transfred to *******45 on 09/02/2024',
    '4.7 EVRs transfred to *******96 on 09/02/2024',
    '7.9 EVRs transfred to *******11 on 09/02/2024',
    '7.9 EVRs transfred to *******11 on 09/02/2024',
    '10.34 EVRs transfred to *******93 on 09/02/2024',
  ]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
    console.log(tab);
    return true;
  }

  const handleClick = () => {
    _authService.submitLogoutRequest().then((resposne: any) => {
        if (resposne) {
            navigation.navigate("login");
        }
    })
  }

  useEffect(() => {
    _xrplService.getTrustlineBalance().then((res: any) => {
      setWalletBalance(parseFloat(res.balance));
      setShowLoadingIndicator(false);
    });
    _apiService.getTransactions().then((res: any) => {
      res.Payments.map((obj: any) => obj.Type = 'SEND');
      res.Received.map((obj: any) => obj.Type = 'RECEIVED');
      let newArray = [...res.Payments, ...res.Received];
      newArray.sort((a: any, b: any) => {
        const dateA = new Date(a.CreatedDate).getTime();
        const dateB = new Date(b.CreatedDate).getTime();
        return dateB - dateA;
      })
      setTransactions(newArray);
      console.log(newArray);
      
    })
  }, []);

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
        <Text style={{fontSize: 20}}>Your Balance is</Text>
        <Text style={{fontSize: 50, color: '#ab0a0a'}}>{walletBalance} EVR</Text>
      </View>
      <View style={styles.historyContainer}>
        <Text style={{marginBottom: 10, fontSize: 20, fontWeight: 'bold'}}>
          Wallet History
        </Text>
        {/* {walletHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text key={index} style={styles.historyData}>
              {item}
            </Text>
          </View>
        ))} */}
        {transactions.length > 0 && transactions.map((item: any, index: any) => (
          <View key={index} style={styles.historyItem}>
            <Text style={item.Type === 'SEND' ? styles.historyPayment : styles.historyReceived}>
              {item.Amount}
            </Text>
            <Text style={styles.historyData}>
              {item.Type === 'SEND' ? item.ToAddress : item.FromAddress}
            </Text>
          </View>
        ))}
      </View>
      <View>
        <RRButton showLeftArrow={false} showRightArrow={false} text="Logout" onTap={handleClick}/>
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
    color: 'black',
  },
  historyPayment: {
    fontSize: 16,
    marginBottom: 5,
    color: 'red',
  },
  historyReceived: {
    fontSize: 16,
    marginBottom: 5,
    color: AppTheme.specification.colors.primary,
  },
  historyItem: {
    marginBottom: 3,
    // flexDirection: "row",
  },
});

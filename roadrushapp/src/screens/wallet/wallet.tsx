import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import {useEffect, useState} from 'react';
import RRButton from '../../components/button/button';
import AuthService from '../../services/auth-service';
import XRPLService from '../../services/xrpl-service';
import ApiService from '../../services/api-service';
import AppTheme from '../../helpers/theme';
import AuthorizedLayoutWithoutScroll from '../../layouts/authorized-layout-without-scroll';
import DateService from '../../services/date-service';

export default function Wallet({navigation}) {
  const _authService = AuthService.getInstance();
  const _xrplService = new XRPLService();
  const _dateService = new DateService();
  const _apiService = ApiService.getInstance();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleClick = () => {
    _authService.submitLogoutRequest().then((resposne: any) => {
      if (resposne) {
        navigation.navigate('login');
      }
    });
  };

  useEffect(() => {
    _xrplService.getTrustlineBalance().then((res: any) => {
      setWalletBalance(parseFloat(res.balance));
      setShowLoadingIndicator(false);
    });
    _apiService.getTransactions().then((res: any) => {
      res.Payments.map((obj: any) => (obj.Type = 'SEND'));
      res.Received.map((obj: any) => (obj.Type = 'RECEIVED'));
      let newArray = [...res.Payments, ...res.Received];
      newArray.sort((a: any, b: any) => {
        const dateA = new Date(a.CreatedDate).getTime();
        const dateB = new Date(b.CreatedDate).getTime();
        return dateB - dateA;
      });
      setTransactions(newArray);
      console.log(newArray);
    });
  }, []);

  return (
    <AuthorizedLayoutWithoutScroll
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      selectedBottomNavigationTab={BottomNavigationButtons.Account}
      title="My Wallet">
      <View style={{flex: 1, marginTop: 10}}>
        <View style={styles.walletContainer}>
          <Text style={{fontSize: 20}}>Your Balance is</Text>
          <Text style={{fontSize: 50, color: AppTheme.specification.colors.primary}}>
            {walletBalance} EVR
          </Text>
        </View>
        <View style={styles.historyContainer}>
          <Text style={{marginBottom: 20, fontSize: 20, fontWeight: 'bold'}}>
            Wallet History
          </Text>
          <ScrollView>
          {transactions.length > 0 &&
            transactions.map((item: any, index: any) => (
              <View key={index} style={styles.historyItem}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text
                    style={
                      item.Type === 'SEND'
                        ? styles.historyPayment
                        : styles.historyReceived
                    }>
                    {item.Amount}
                  </Text>
                  <Text>{_dateService.getThemedTimeStamp(item.CreatedDate)}</Text>
                </View>
                <Text style={styles.historyData}>
                  {item.Type === 'SEND' ? 'To: ' + item.ToAddress : 'From: ' + item.FromAddress}
                </Text>
              </View>
            ))}
            </ScrollView>
        </View>
      </View>
      <View style={{}}>
        <RRButton
          showLeftArrow={false}
          showRightArrow={false}
          text="Logout"
          onTap={handleClick}
        />
      </View>
    </AuthorizedLayoutWithoutScroll>
  );
}

const styles = StyleSheet.create({
  walletContainer: {
    // flex: 0.2,
    margin: 20,
    borderColor: AppTheme.specification.colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: AppTheme.specification.colors.white,
    padding: 15,
    height: 120,
    alignItems: 'center'
  },
  historyContainer: {
    flex: 1,
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
    marginVertical: 10,
  },
});

import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import {useEffect, useState} from 'react';
import XRPLService from '../../services/xrpl-service';
import ApiService from '../../services/api-service';
import AppTheme from '../../helpers/theme';
import DateService from '../../services/date-service';
import AuthorizedLayoutWithoutScroll from '../../layouts/authorized-layout-without-scroll';
import axios from 'axios';
import AppSettings from '../../helpers/app-settings';

export default function Wallet({navigation}) {
  const _xrplService = new XRPLService();
  const _dateService = new DateService();
  const _apiService = ApiService.getInstance();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState('');

  useEffect(() => {
    _xrplService.getTrustlineBalance().then((res: any) => {
      setWalletBalance(parseFloat(res.balance));
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
      setShowLoadingIndicator(false);
    });
    axios.get('https://api.coinranking.com/v2/coin/k71c5qIRt/price', {
      headers: {
        'x-access-token': AppSettings.coinRankingApiKey
      },
    }).then(res => setExchangeRate(res.data.data.price));
  }, []);

  return (
    <AuthorizedLayoutWithoutScroll
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      selectedBottomNavigationTab={BottomNavigationButtons.Wallet}
      title="My Wallet">
      <View style={{flex: 1, marginTop: 10}}>
        <View style={styles.walletContainer}>
          <Text style={{fontSize: 20}}>Your Balance is</Text>
          <Text style={{fontSize: 40, color: AppTheme.specification.colors.primary, fontWeight: 'bold'}}>
            {walletBalance.toLocaleString('en-US').replace(' ', ',')} EVR
          </Text>
          <Text style={{fontSize: 18}}>{(walletBalance * parseFloat(exchangeRate)).toFixed(3)} USD</Text>
        </View>
        <View style={styles.historyContainer}>
          <Text style={{marginBottom: 20, fontSize: 20, fontWeight: 'bold'}}>
            Wallet History
          </Text>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {transactions.length > 0 &&
            transactions.map((item: any, index: any) => (
              <View key={index} style={styles.historyItem}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={
                      item.Type === 'SEND'
                        ? styles.historyPayment
                        : styles.historyReceived
                    }>
                    {item.Amount.toLocaleString('en-US').replace(' ', ',')} EVR
                  </Text>
                  <Text>
                    {_dateService.getThemedTimeStamp(item.CreatedDate)}
                  </Text>
                </View>
                <Text style={styles.historyData}>
                  {item.Type === 'SEND'
                    ? 'To: ' + item.ToAddress
                    : 'From: ' + item.FromAddress}
                </Text>
                <Text style={styles.historyData}>
                  Trip: {item.PickUpAddress} to {item.DestinationAddress}
                </Text>
                <Text style={styles.historyData}>
                  Distance: {item.Distance} km
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </AuthorizedLayoutWithoutScroll>
  );
}

const styles = StyleSheet.create({
  walletContainer: {
    margin: 15,
    borderColor: AppTheme.specification.colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: AppTheme.specification.colors.white,
    padding: 10,
    alignItems: 'center',
  },
  scrollView: {
    height: 400
  },
  historyContainer: {
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
    fontWeight: 'bold'
  },
  historyReceived: {
    fontSize: 16,
    marginBottom: 5,
    color: AppTheme.specification.colors.primary,
    fontWeight: 'bold'
  },
  historyItem: {
    borderWidth: 0.75,
    borderColor: AppTheme.specification.colors.primary,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    minHeight: 70,
  },
});

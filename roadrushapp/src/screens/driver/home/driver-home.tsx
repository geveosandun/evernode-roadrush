import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BottomNavigationButtons} from '../../../components/bottom-navigation-bar/bottom-navigation-bar';
import RRButton from '../../../components/button/button';
import AuthorizedLayout from '../../../layouts/authorized-layout';

export function DriverHome({navigation}): React.JSX.Element {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const requests = [
    {id: '1', name: 'John Doe', pickUpDistance: '2 km'},
    {id: '2', name: 'Robert Will', pickUpDistance: '2.4 km'},
    {id: '3', name: 'Will Smith', pickUpDistance: '3 km'},
    {id: '4', name: 'Jimmy Kay', pickUpDistance: '3 km'},
    {id: '5', name: 'Lilly White', pickUpDistance: '3.2 km'},
  ];

  async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
    console.log(tab);
    return true;
  }

  return (
    <AuthorizedLayout
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Requests</Text>
        {requests.map(item => (
          <View key={item.id} style={styles.item}>
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.pickUpDistance} away</Text>

              <RRButton
                text="Accept"
                onTap={() => navigation.navigate('rideviewdriver')}
              />
            </View>
          </View>
        ))}
      </View>
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#9fc4b1',
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
});

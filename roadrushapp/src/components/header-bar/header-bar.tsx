import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppTheme from '../../helpers/theme';

export function HeaderBar({
  navigation,
  title = 'Title',
  showBackArrow = true,
}): React.JSX.Element {
  return (
    <View>
      {/* {showBackArrow && <FontAwesomeIcon icon={faArrowLeft} size={28} style={styles.backArrow} />} */}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    padding: 10,
    margin: 10,
  },
  headerText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: AppTheme.specification.colors.black,
    borderBottomWidth: 1,
    backgroundColor: AppTheme.specification.colors.primary,
  },
});

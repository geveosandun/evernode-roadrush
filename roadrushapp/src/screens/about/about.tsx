import {Link} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import AppTheme from '../../helpers/theme';

export function About(): React.JSX.Element {
  return (
    <View>
      <Text>About screen</Text>
      <Link to="/login" style={AppTheme.components.button}>
        Go to Login
      </Link>
    </View>
  );
}

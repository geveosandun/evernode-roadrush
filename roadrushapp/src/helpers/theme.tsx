import {StyleSheet} from 'react-native';

const AppThemeSpec = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    red: '#FF2800',
    primary: '#23d856',
    secondary: '#282E3B',
    backgroundShade: '#22D85520', // with 20% alpha value
    mediumGrey: '#808080',
    darkGrey: '#333333',
    toast_infoBlue: '#279FDB',
    toast_errorRed: '#DD1133',
    toast_warningOrange: '#DB9027',
    toast_successGreen: '#2AA337',
    toastBackground: '#6E6E6E',
  },
  spacings: {
    lineSpace: 10, // example
  },
};

const AppThemeComponents = StyleSheet.create({
  icon: {
    color: 'green',
    margin: 10,
    padding: 10,
  },
  textbox: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 16,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

class AppTheme {
  static specification = AppThemeSpec;
  static components = AppThemeComponents;
}

export default AppTheme;

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import AppTheme from '../../helpers/theme';

const RRButton = ({
  onTap = null,
  text = 'Button',
  bgColor = AppTheme.specification.colors.primary,
  textColor = AppTheme.specification.colors.white,
  showLeftArrow = false,
  showRightArrow = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onTap}
      style={[styles.container, {backgroundColor: bgColor}]}>
      {showLeftArrow && (
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={24}
          style={styles.leftIcon}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.text, {color: textColor}]}>{text}</Text>
      </View>
      {showRightArrow && (
        <FontAwesomeIcon
          icon={faChevronRight}
          size={24}
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  leftIcon: {
    color: AppTheme.specification.colors.white,
  },
  rightIcon: {
    color: AppTheme.specification.colors.white,
  },
});

export default RRButton;

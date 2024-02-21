import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppTheme from "../../helpers/theme";

const SCButton = ({
  onTap = null,
  text = "Button",
  bgColor = AppTheme.colors.primary,
  textColor = AppTheme.colors.white,
  showLeftArrow = true,
  showRightArrow = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onTap}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      {showLeftArrow && (
        <Icon name="chevron-left" size={30} style={styles.leftIcon} />
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </View>
      {showRightArrow && (
        <Icon name="chevron-right" size={30} style={styles.rightIcon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  leftIcon: {
    color: AppTheme.colors.white,
  },
  rightIcon: {
    color: AppTheme.colors.white,
  },
});

export default SCButton;
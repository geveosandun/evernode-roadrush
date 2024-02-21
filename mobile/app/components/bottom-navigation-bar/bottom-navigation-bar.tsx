import {
  faHome,
  faList,
  faShoePrints,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppTheme from "../../helpers/theme";
import React from "react";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
export enum BottomNavigationButtons {
  Home,
  List,
  Steps,
  Account,
}

export default function SCBottomNavigationBar({
  navigation,
  selectedTab = BottomNavigationButtons.Home,
  onTapCallback = null,
}) {
  async function onTap(tappedTab: BottomNavigationButtons) {
    if (onTapCallback) {
      let allowNavigation = await onTapCallback(tappedTab);

      if (allowNavigation) {
        switch (tappedTab) {
          case BottomNavigationButtons.List:
            navigation.navigate("ListScreen");
            break;

          case BottomNavigationButtons.Steps:
            navigation.navigate("StepsScreen");
            break;

          case BottomNavigationButtons.Account:
            navigation.navigate("AccountScreen");
            break;

          case BottomNavigationButtons.Home:
          default:
            navigation.navigate("HomeScreen");
            break;
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* <View
        style={{ height: 2, backgroundColor: AppTheme.colors.primary }}
      ></View> */}
      <View style={styles.navbar}>
        <View
          style={[
            styles.actionButton,
            selectedTab == BottomNavigationButtons.Home
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Home);
            }}
          >
            <FontAwesomeIcon icon={faHome} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.actionButton,
            selectedTab == BottomNavigationButtons.List
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.List);
            }}
          >
            <FontAwesomeIcon icon={faList} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.actionButton,
            selectedTab == BottomNavigationButtons.Steps
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Steps);
            }}
          >
            <FontAwesomeIcon
              icon={faShoePrints}
              size={25}
              style={{ transform: [{ rotate: "-90deg" }] }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.actionButton,
            selectedTab == BottomNavigationButtons.Account
              ? styles.activeActionButton
              : styles.inactiveActionButton,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Account);
            }}
          >
            <FontAwesomeIcon icon={faUser} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
  },
  navbar: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height:90,
    width: screenWidth,
    elevation: 10,
  },
  actionButton: {
    alignSelf: "center",
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: screenWidth/4,
  },
  activeActionButton: {
    backgroundColor: AppTheme.colors.backgroundShade,
    borderRadius: 50,
  },
  inactiveActionButton: {
    opacity: 0.3,
  },
});

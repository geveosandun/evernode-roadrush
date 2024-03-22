import {
  faBars,
  faBell,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import AppTheme from "../../helpers/theme";
import React from "react";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
export enum BottomNavigationButtons {
  Home,
  Activity,
  Notification,
  Profile
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
          case BottomNavigationButtons.Activity:
            navigation.navigate("ActivityScreen");
            break;

          case BottomNavigationButtons.Notification:
            navigation.navigate("NotificationScreen");
            break;

          case BottomNavigationButtons.Profile:
            navigation.navigate("WalletScreen");
            break;

          case BottomNavigationButtons.Home:
          default:
            navigation.navigate("SelectTypeScreen");
            break;
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.actionButton}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Home);
            }}
            style={[
              selectedTab === BottomNavigationButtons.Home
                ? styles.activeActionButton
                : styles.inactiveActionButton
            ]}
          >
            <FontAwesomeIcon icon={faHome} size={25} color={AppTheme.colors.secondary}/>
            {selectedTab === BottomNavigationButtons.Home && <Text style={styles.navigationText}>  Home</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Activity);
            }}
            style={[
              selectedTab === BottomNavigationButtons.Activity
                ? styles.activeActionButton
                : styles.inactiveActionButton
            ]}
          >
            <FontAwesomeIcon icon={faBars} size={25} color={AppTheme.colors.secondary} />
            {selectedTab === BottomNavigationButtons.Activity && <Text style={styles.navigationText}>  Activity</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Notification);
            }}
            style={[
              selectedTab === BottomNavigationButtons.Notification
                ? styles.activeActionButton
                : styles.inactiveActionButton
            ]}
          >
            <FontAwesomeIcon icon={faBell} size={25} color={AppTheme.colors.secondary} />
            {selectedTab === BottomNavigationButtons.Notification && <Text style={styles.navigationText}>  Notification</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              await onTap(BottomNavigationButtons.Profile);
            }}
            style={[
              selectedTab === BottomNavigationButtons.Profile
                ? styles.activeActionButton
                : styles.inactiveActionButton
            ]}
          >
            <FontAwesomeIcon icon={faUser} size={25} color={AppTheme.colors.secondary} />
            {selectedTab === BottomNavigationButtons.Profile && <Text style={styles.navigationText}>  Profile</Text>}
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height:90,
    width: screenWidth,
    elevation: 10,
  },
  actionButton: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 15,
    width: screenWidth/4,
  },
  activeActionButton: {
    backgroundColor: AppTheme.colors.backgroundShade,
    padding: 15,
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  inactiveActionButton: {
    opacity: 0.3,
  },
  navigationText: {
    fontSize: 11
  }
});

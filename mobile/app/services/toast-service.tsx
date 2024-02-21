import Toast from "react-native-root-toast";
import { ToastMessageTypes } from "../helpers/constants";
import AppTheme from "../helpers/theme";

export function showToast(message: string, type: ToastMessageTypes) {
  let textColour: string;

  switch (type) {
    case ToastMessageTypes.warning:
      textColour = AppTheme.colors.toast_warningOrange;
      break;

    case ToastMessageTypes.error:
      textColour = AppTheme.colors.toast_errorRed;
      break;

    case ToastMessageTypes.success:
      textColour = AppTheme.colors.toast_successGreen;
      break;

    case ToastMessageTypes.info:
      textColour = AppTheme.colors.toast_infoBlue;
      break;

    default:
      textColour = AppTheme.colors.black;
      break;
  }

  Toast.show(message, {
    opacity: 1,
    duration: Toast.durations.LONG,
    backgroundColor: AppTheme.colors.white,
    textColor: textColour,
    position: Toast.positions.TOP,
    animation: true,
    shadow: true,
    shadowColor: AppTheme.colors.black,
    containerStyle: {
      borderLeftWidth: 5,
      borderRightWidth: 5,
      borderColor: textColour,
    },
  });
}

import Toast from "react-native-root-toast";
import { ToastMessageTypes } from "../helpers/constants";
import AppTheme from "../helpers/theme";

export function showToast(message: string, type: ToastMessageTypes) {
  let textColour: string;

  switch (type) {
    case ToastMessageTypes.warning:
      textColour = AppTheme.specification.colors.toast_warningOrange;
      break;

    case ToastMessageTypes.error:
      textColour = AppTheme.specification.colors.toast_errorRed;
      break;

    case ToastMessageTypes.success:
      textColour = AppTheme.specification.colors.toast_successGreen;
      break;

    case ToastMessageTypes.info:
      textColour = AppTheme.specification.colors.toast_infoBlue;
      break;

    default:
      textColour = AppTheme.specification.colors.black;
      break;
  }

  Toast.show(message, {
    opacity: 1,
    duration: Toast.durations.LONG,
    backgroundColor: AppTheme.specification.colors.white,
    textColor: textColour,
    position: Toast.positions.TOP,
    animation: true,
    shadow: true,
    shadowColor: AppTheme.specification.colors.black,
    containerStyle: {
      borderLeftWidth: 5,
      borderRightWidth: 5,
      borderColor: textColour,
    },
  });
}

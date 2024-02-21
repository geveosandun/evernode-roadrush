// PopupMessage.tsx
import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppTheme from '../../helpers/theme';

interface PopupMessageProps {
  isVisible: boolean;
  topic: string;
  message: string;
  onYes?: () => void;
  onNo?: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ isVisible, topic, message, onYes, onNo }) => {
  return (
    <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.topicText}>{topic}</Text>
          <Text style={styles.errorText}>{message}</Text>
          <View style={styles.buttonContainer}>
            {onYes && (
              <TouchableOpacity onPress={onYes} style={styles.yesButton}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            )}
            {onNo && (
              <TouchableOpacity onPress={onNo} style={styles.noButton}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: AppTheme.colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  yesButton: {
    marginRight: 10,
    paddingRight: 20,
    paddingLeft:20,
    paddingBottom:10,
    paddingTop:10,
    backgroundColor: AppTheme.colors.primary,
    borderRadius: 5,
    width:120,
    alignItems: "center"
  },
  noButton: {
    paddingRight: 20,
    paddingLeft:20,
    paddingBottom:10,
    paddingTop:10,
    backgroundColor: AppTheme.colors.mediumGrey,
    borderRadius: 5,
    width:120,
    alignItems: "center"
  },
  buttonText:{
    color:AppTheme.colors.white,
    fontWeight: 'bold'
  },
  errorText: {
    color:AppTheme.colors.black,
    alignItems: 'center',
    fontSize: 16,
    padding:18
   },
   topicText:{
    color:AppTheme.colors.black,
    fontWeight: 'bold',
    fontSize:18,
    padding: 5
  },
});

export default PopupMessage;

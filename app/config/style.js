import { StyleSheet } from 'react-native';

export const COLORS = {
  blue: '#43A9B8',
  black: '#0C090D',
  yellow: '#F9C22E',
  orange: '#F15946',
  pink: '#E01A4F'
};

export const STYLES = StyleSheet.create({
  error: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    textAlign: 'center',
    backgroundColor: COLORS.pink,
    color: 'white'
  },
  picker: {
    marginLeft: 10,
    marginRight: 10
  },
  submit: {
    marginTop: 10,
    marginBottom: 10
  },
  createMessageButton: {
    marginTop: 20,
    marginBottom: 5
  },
  attachmentPreviewButton: {
    padding: 5,
    marginTop: -10,
    marginRight: -10
  },
  messageContent: {
    marginTop: 20,
    marginBottom: 20
  },
  commentContent: {
    marginTop: 10,
    marginBottom: 10
  },
  toggleCommentsButton: {
    marginTop: 10
  },
  modalView: {
    margin: 0
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 9999
  }
});

import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';

const ActionButton = ({text, onPress}) => {
  return (
    <Button mode="contained" onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text ? text : ''}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FBBC00',
  },
  buttonText: {
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 40,
  },
});

export default ActionButton;

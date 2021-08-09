import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';

const ActionButton = ({
  text,
  onPress,
  style = {},
  disabled,
  textStyle = {},
  ...rest
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={[styles.button(disabled), style]}
      disabled={disabled}
      {...rest}>
      <Text style={[styles.buttonText, textStyle]}>{text ? text : ''}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: disabled => ({
    backgroundColor: disabled ? '#4A657255' : '#4A6572',
  }),
  buttonText: {
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 40,
    color: 'white',
  },
});

export default ActionButton;

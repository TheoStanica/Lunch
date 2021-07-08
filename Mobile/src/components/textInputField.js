import React from 'react';
import {TextInput} from 'react-native-paper';
import {Text, StyleSheet} from 'react-native';

const TextInputField = ({
  label,
  value,
  errors,
  handleChange,
  field,
  secureTextEntry = false,
}) => {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={handleChange(field)}
        secureTextEntry={secureTextEntry}
      />
      {errors && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: '#FF0D10',
  },
});

export default TextInputField;

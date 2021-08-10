import React from 'react';
import {StyleSheet} from 'react-native';
import TextInputField from './textInputField';

const MenuCreatorInputField = ({
  placeholder,
  value,
  handleChange,
  handleBlur,
  touched,
  errors,
  field,
}) => {
  return (
    <TextInputField
      placeholder={placeholder}
      value={value}
      handleChange={handleChange}
      handleBlur={handleBlur}
      touched={touched}
      errors={errors}
      field={field}
      underlineColor="transparent"
      underlineColorAndroid="transparent"
      style={styles.inputField}
      theme={{
        roundness: 50,
        colors: {primary: 'transparent'},
      }}
      selectionColor="black"
    />
  );
};

const styles = StyleSheet.create({
  inputField: {
    fontSize: 15,
    borderWidth: 0,
    borderRadius: 50,
    height: 45,
  },
});

export default MenuCreatorInputField;

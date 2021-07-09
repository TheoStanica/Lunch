import React from 'react';
import {TextInput, HelperText} from 'react-native-paper';

const TextInputField = ({
  label,
  value,
  errors,
  handleChange,
  field,
  ...rest
}) => {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={handleChange(field)}
        secureTextEntry={false}
        style={{backgroundColor: 'transparent'}}
        underlineColor="#0008"
        theme={{colors: {primary: 'black'}}}
        {...rest}
      />
      <HelperText type="error" visible={errors ? true : false}>
        {errors}
      </HelperText>
    </>
  );
};

export default TextInputField;

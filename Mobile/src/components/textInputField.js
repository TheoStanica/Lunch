import React, {useState} from 'react';
import {TextInput, HelperText} from 'react-native-paper';

const TextInputField = ({
  label,
  value,
  errors,
  handleChange,
  field,
  handleBlur,
  touched,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
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
        onBlur={handleBlur(field)}
        onFocus={() => setIsFocused(true)}
        {...rest}
      />
      {errors && (isFocused || touched) ? (
        <HelperText type="error">{errors}</HelperText>
      ) : null}
    </>
  );
};

export default TextInputField;

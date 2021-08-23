import React from 'react';
import {StyleSheet, Text, SafeAreaView, Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDropDownPicker = ({
  text,
  setSelectedItem,
  items,
  placeholder,
  textStyle = {},
  containerStyle = {marginHorizontal: 15, marginVertical: 5},
}) => {
  return (
    <SafeAreaView style={containerStyle}>
      <Text style={textStyle}>{text} </Text>
      <RNPickerSelect
        onValueChange={value => setSelectedItem(value)}
        items={items}
        placeholder={placeholder}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Icon name="chevron-down" size={30} color="gray" />;
        }}
      />
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#0007',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#0007',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: Platform.OS === 'ios' ? 8 : 12,
    right: 5,
  },
  placeholder: {
    color: 'black',
  },
});

export default CustomDropDownPicker;

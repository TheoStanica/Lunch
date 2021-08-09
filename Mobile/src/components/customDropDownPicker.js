import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropDownPicker = ({
  text,
  openDropDown,
  selectedItem,
  setSelectedItem,
  setOpenDropDown,
  items,
  placeholder,
  zIndex = 1000,
  textStyle = {},
}) => {
  return (
    <SafeAreaView style={styles.container(zIndex)}>
      <Text style={textStyle}>{text} </Text>
      <DropDownPicker
        open={openDropDown}
        value={selectedItem}
        setValue={setSelectedItem}
        setOpen={setOpenDropDown}
        items={items}
        placeholder={placeholder}
        style={styles.dropDownStyle}
        selectedItemContainerStyle={{backgroundColor: '#4A6572'}}
        selectedItemLabelStyle={styles.selectedItemLabel}
        dropDownContainerStyle={styles.dropdownContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: zIndex => ({
    marginHorizontal: 15,
    marginVertical: 5,
    zIndex: zIndex,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  }),
  dropDownStyle: {
    backgroundColor: 'transparent',
    borderColor: '#0007',
    borderWidth: 0.3,
  },
  selectedItemLabel: {
    color: 'white',
  },
  dropdownContainer: {
    backgroundColor: '#FFF1CA',
    borderColor: '#0007',
    borderWidth: 0.3,
  },
});

export default CustomDropDownPicker;

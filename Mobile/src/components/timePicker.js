import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const DateTimePicker = ({title, description, onConfirm, mode, ...rest}) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <>
      <List.Item
        title={title}
        description={description}
        right={() => (
          <View style={styles.icon}>
            <Icon
              size={40}
              name={'clock'}
              color={'#FCBB00'}
              onPress={() => setIsPickerVisible(true)}
            />
          </View>
        )}
      />
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={mode}
        onCancel={() => setIsPickerVisible(false)}
        onConfirm={date => {
          setIsPickerVisible(false);
          onConfirm(date);
        }}
        {...rest}
      />
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateTimePicker;

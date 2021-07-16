import {TouchableRipple, List} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminField = ({
  onPress,
  title,
  description,
  icon,
  iconColor = '#FBBC00',
}) => {
  return (
    <TouchableRipple onPress={onPress} rippleColor="#4A6572">
      <List.Item
        title={title}
        titleStyle={styles.title}
        description={description}
        descriptionStyle={styles.description}
        left={() =>
          icon ? (
            <View style={styles.icon}>
              <Icon size={40} name={icon} color={iconColor} />
            </View>
          ) : null
        }
      />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  description: {
    textTransform: 'capitalize',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminField;

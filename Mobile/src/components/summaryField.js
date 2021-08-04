import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SummaryField = ({text, icon, iconColor = '#4A6572'}) => {
  return (
    <View style={styles.flexDirectionRow}>
      <Icon size={20} name={icon} color={iconColor} />
      <Text style={styles.summary}>
        {'  '}
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summary: {
    fontSize: 15,
    marginVertical: 2.5,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});

export default SummaryField;

import React from 'react';
import {Paragraph} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileField = ({title, paragraph, icon, iconColor = '#FBBC00'}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name={icon} size={35} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Paragraph>{paragraph}</Paragraph>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 1,
  },
  content: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});

export default ProfileField;

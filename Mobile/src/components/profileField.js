import React from 'react';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, Text} from 'react-native';

const ProfileField = ({title, paragraph, icon, iconColor = '#FBBC00'}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name={icon} size={40} color={iconColor} />
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
    marginVertical: 10,
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
    fontSize: 20,
    textTransform: 'capitalize',
  },
});

export default ProfileField;

import React from 'react';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet} from 'react-native';

const ProfileField = ({title, paragraph, icon}) => {
  return (
    <Card.Content>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon name={icon} size={40} color="green" />
        </View>
        <View style={styles.content}>
          <Title>{title}</Title>
          <Paragraph style={styles.paragraph}>{paragraph}</Paragraph>
        </View>
      </View>
      <Divider style={styles.divider} />
    </Card.Content>
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
  paragraph: {
    color: 'gray',
    textTransform: 'capitalize',
  },
});

export default ProfileField;

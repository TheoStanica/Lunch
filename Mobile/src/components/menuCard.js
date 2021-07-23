import React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const MenuCard = ({onPress, title}) => {
  return (
    <Card style={styles.container} onPress={onPress}>
      <Card.Cover
        style={styles.photo}
        resizeMode="contain"
        source={require('../assets/images/eating.png')}
      />
      <Card.Title title={title} style={styles.title} />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderRadius: 15,
    marginHorizontal: 15,
  },
  title: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#FCBB00',
  },
  photo: {
    height: 160,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#FFF1CA',
  },
});

export default MenuCard;

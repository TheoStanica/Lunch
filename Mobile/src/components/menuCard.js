import React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const MenuCard = ({onPress, title}) => {
  return (
    <Card style={styles.container} onPress={onPress}>
      <Card.Cover
        style={styles.photo}
        resizeMode="contain"
        source={require('../assets/images/caphyon.png')}
      />
      <Card.Title title={title} />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginVertical: 5,
  },
  photo: {
    height: 160,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#0004',
  },
});

export default MenuCard;

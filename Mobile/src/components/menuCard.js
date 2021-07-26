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
      <Card.Title
        title={title}
        style={styles.title}
        titleStyle={styles.titleStyle}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderRadius: 15,
  },
  title: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#4A6572',
  },
  photo: {
    height: 160,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#FFF1CA55',
  },
  titleStyle: {
    color: 'white',
  },
});

export default MenuCard;

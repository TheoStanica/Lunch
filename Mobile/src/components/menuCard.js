import React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet, Alert, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {notifyUsers} from '../redux/thunks/menuThunks';
import {useDispatch} from 'react-redux';

const MenuCard = ({onPress, title, menuId}) => {
  const dispatch = useDispatch();

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
      <View style={styles.alert}>
        <Icon
          name="bell-ring"
          size={25}
          color="white"
          onPress={() =>
            Alert.alert(
              'Notify',
              `Do you want to notify everyone that their order arrived at the office?`,
              [
                {
                  text: 'Yes',
                  onPress: () => dispatch(notifyUsers({menuId})),
                },
                {text: 'No'},
              ],
            )
          }
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
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
  alert: {
    backgroundColor: '#4A6572',
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
    borderRadius: 20,
  },
});

export default MenuCard;

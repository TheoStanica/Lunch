import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Title, Divider} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from '../../components/actionButton';

const MenuDetailsScreen = ({navigation, route}) => {
  const {menu, menuId} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/eating.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.body}>
        <View style={styles.title}>
          <Title style={styles.title}> Epoca Business Menu </Title>
        </View>
        <Divider style={styles.divider} />
        <FlatList
          data={menu}
          keyExtractor={item => item.courseCategory}
          renderItem={({item}) => {
            return (
              <View>
                <Text style={styles.courseCategory}>{item.courseCategory}</Text>
                <FlatList
                  data={item.courses}
                  keyExtractor={item => item.description}
                  renderItem={({item}) => {
                    return (
                      <Text style={styles.courseDescription}>
                        {item.description}
                      </Text>
                    );
                  }}
                />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
        <Divider style={styles.divider} />
        <View style={styles.going}>
          <Title>Going</Title>
          <Icon
            name="information"
            size={30}
            style={{justifyContent: 'center'}}
          />
        </View>
        <View style={styles.buttons}>
          <ActionButton
            text="Restaurant"
            style={styles.firstButton}
            onPress={() => navigation.navigate('HomeScreen')}
          />
          <ActionButton
            text="Takeaway"
            style={styles.secondButton}
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  firstButton: {
    marginRight: 30,
  },
  secondButton: {
    marginLeft: 30,
  },
  title: {
    alignItems: 'center',
    marginVertical: 5,
    fontSize: 25,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#FFF1CA',
  },
  body: {
    flex: 3,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#FBBC00',
    marginBottom: 10,
  },
  going: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  courseCategory: {
    marginLeft: 25,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
  },
  courseDescription: {
    marginLeft: 50,
    fontSize: 15,
    marginBottom: 10,
  },
});

export default MenuDetailsScreen;

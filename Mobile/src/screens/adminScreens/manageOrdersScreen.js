import React from 'react';
import {StyleSheet, SafeAreaView, FlatList, View} from 'react-native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ManageOrdersScreen = ({route, navigation}) => {
  const {statistics} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.entries(statistics.users ? statistics.users : {})}
        keyExtractor={item => item}
        renderItem={user => (
          <List.Item
            style={styles.itemContainer('#fff7e0')}
            title={user.item[0]}
            titleStyle={styles.listTitle}
            onPress={() =>
              navigation.navigate('UserRestaurantOrdersScreen', {
                user: user.item,
              })
            }
            left={() => (
              <View style={styles.icon}>
                <Icon size={30} name={'account'} color={'#4A6572'} />
              </View>
            )}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  listTitle: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  itemContainer: backgroundColor => ({
    backgroundColor: backgroundColor,
  }),
  icon: {
    marginLeft: 10,
  },
});

export default ManageOrdersScreen;

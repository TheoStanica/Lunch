import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList, View} from 'react-native';
import {Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import ActionButton from '../components/actionButton';
import AdminField from '../components/adminField';
import {getRestaurants} from '../redux/thunks/restaurantThunks';

const ManageRestaurantsScreen = () => {
  const {restaurants, restaurantsById} = useSelector(
    state => state.restaurantReducer,
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants({onFinish: () => {}}));
  }, []);

  const onRefresh = () => {
    console.log('refreshing');
    setIsFetching(true);
    dispatch(
      getRestaurants({
        onFinish: () => setIsFetching(false),
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Manage Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={restaurant => restaurant}
        renderItem={restaurant => (
          <AdminField
            id={restaurant.item}
            title={restaurantsById[restaurant.item].name}
            description={restaurantsById[restaurant.item].cost}
            icon="food"
            onPress={() =>
              setSelectedRestaurant(restaurantsById[restaurant.item])
            }
          />
        )}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />
      <Modal
        visible={selectedRestaurant}
        onDismiss={() => setSelectedRestaurant(null)}>
        <View style={{backgroundColor: 'white'}}>
          <Text>Restaurant info {selectedRestaurant?.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <ActionButton text="Ceva" style={{flex: 1}}></ActionButton>
            <ActionButton text="Altceva" style={{flex: 1}}></ActionButton>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManageRestaurantsScreen;

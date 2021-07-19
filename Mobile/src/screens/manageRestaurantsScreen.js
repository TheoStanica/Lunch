import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AdminField from '../components/adminField';
import {
  deleteRestaurant,
  getRestaurants,
} from '../redux/thunks/restaurantThunks';
import HideKeyboard from '../components/hideKeyboard';

const ManageRestaurantsScreen = ({navigation}) => {
  const {restaurants, restaurantsById} = useSelector(
    state => state.restaurantReducer,
  );
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getRestaurants(() => {
        setIsFetching(false);
      }),
    );
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(getRestaurants(() => setIsFetching(false)));
  };

  return (
    <HideKeyboard>
      <FlatList
        data={restaurants}
        keyExtractor={restaurant => restaurant}
        renderItem={restaurant => (
          <AdminField
            id={restaurant.item}
            title={restaurantsById[restaurant.item].name}
            description={`Cost: ${restaurantsById[restaurant.item].cost} lei`}
            icon="food"
            onDelete={() => dispatch(deleteRestaurant({id: restaurant.item}))}
            onEdit={() =>
              navigation.navigate('RestaurantDetailsScreen', {
                restaurantId: restaurant.item,
              })
            }
          />
        )}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />
    </HideKeyboard>
  );
};

export default ManageRestaurantsScreen;

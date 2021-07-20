import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {FAB} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AdminField from '../../components/adminField';
import {
  deleteRestaurant,
  getRestaurants,
} from '../../redux/thunks/restaurantThunks';
import HideKeyboard from '../../components/hideKeyboard';
import {useFocusEffect} from '@react-navigation/native';

const ManageRestaurantsScreen = ({navigation}) => {
  const {restaurants, restaurantsById} = useSelector(
    state => state.restaurantReducer,
  );
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  const [row, setRow] = useState([]);
  const [previousOpenedRow, setPreviousOpenedRow] = useState(null);

  const [visible, setVisible] = useState(false);

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(getRestaurants(() => setIsFetching(false)));
  };
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, []),
  );
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 500);
  }, []);

  return (
    <HideKeyboard>
      <>
        <FlatList
          data={restaurants}
          keyExtractor={restaurant => restaurant}
          renderItem={restaurant => (
            <AdminField
              index={restaurant.index}
              title={restaurantsById[restaurant.item].name}
              description={`Cost: ${restaurantsById[restaurant.item].cost} lei`}
              icon="food"
              onDelete={() => dispatch(deleteRestaurant({id: restaurant.item}))}
              onEdit={() =>
                navigation.navigate('RestaurantDetailsScreen', {
                  restaurantId: restaurant.item,
                })
              }
              row={row}
              onUpdateRow={row => setRow(row)}
              prevOpenedRow={previousOpenedRow}
              onUpdatePrevOpenedRow={prevRow => setPreviousOpenedRow(prevRow)}
            />
          )}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          color="white"
          visible={visible}
          animated={true}
          onPress={() => navigation.navigate('CreateRestaurantScreen')}
        />
      </>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 40,
    right: 0,
    bottom: 0,
  },
});

export default ManageRestaurantsScreen;

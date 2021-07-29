import React, {useState, useCallback} from 'react';
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
    setVisible(false);
    setIsFetching(true);
    dispatch(
      getRestaurants(() => {
        setIsFetching(false);
        setVisible(true);
      }),
    );
  };
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, []),
  );

  return (
    <HideKeyboard>
      <>
        <FlatList
          data={restaurants}
          keyExtractor={restaurant => restaurant}
          contentContainerStyle={styles.container}
          style={styles.container}
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
          showsVerticalScrollIndicator={false}
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
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#FFF1CA',
  },
  fab: {
    position: 'absolute',
    margin: 40,
    right: 0,
    bottom: 0,
  },
});

export default ManageRestaurantsScreen;

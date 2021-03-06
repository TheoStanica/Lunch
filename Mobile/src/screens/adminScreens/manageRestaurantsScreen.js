import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {FAB} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteRestaurant,
  getRestaurants,
} from '../../redux/thunks/restaurantThunks';
import {useFocusEffect} from '@react-navigation/native';
import HideKeyboard from '../../components/hideKeyboard';
import AdminField from '../../components/adminField';

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
    <SafeAreaView style={styles.container}>
      <HideKeyboard>
        <>
          <FlatList
            data={restaurants}
            keyExtractor={restaurant => restaurant}
            renderItem={restaurant => (
              <AdminField
                index={restaurant.index}
                title={restaurantsById[restaurant.item].name}
                description={`Cost: ${
                  restaurantsById[restaurant.item].cost
                } RON`}
                icon="food"
                onDelete={() =>
                  dispatch(deleteRestaurant({id: restaurant.item}))
                }
                onEdit={() =>
                  navigation.navigate('RestaurantDetailsScreen', {
                    restaurantId: restaurant.item,
                  })
                }
                row={row}
                onUpdateRow={row => setRow(row)}
                prevOpenedRow={previousOpenedRow}
                onUpdatePrevOpenedRow={prevRow => setPreviousOpenedRow(prevRow)}
                backgroundColor={
                  restaurantsById[restaurant.item].status === 'active'
                    ? '#fff7e0'
                    : '#bdbdbd'
                }
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

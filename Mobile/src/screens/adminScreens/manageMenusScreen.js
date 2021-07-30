import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AdminField from '../../components/adminField';
import {
  deleteRestaurant,
  getRestaurants,
} from '../../redux/thunks/restaurantThunks';
import HideKeyboard from '../../components/hideKeyboard';
import {useFocusEffect} from '@react-navigation/native';
import {getMenus} from '../../redux/thunks/menuThunks';

const ManageMenusScreen = () => {
  const {menus, menusById} = useSelector(state => state.menuReducer);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  const [row, setRow] = useState([]);
  const [previousOpenedRow, setPreviousOpenedRow] = useState(null);

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(getMenus({}, () => setIsFetching(false)));
  };
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, []),
  );

  return (
    <HideKeyboard>
      <FlatList
        data={menus}
        keyExtractor={restaurant => restaurant}
        contentContainerStyle={styles.container}
        style={styles.container}
        renderItem={restaurant => (
          <AdminField
            index={restaurant.index}
            title={menusById[restaurant.item].name}
            description={`Cost: ${menusById[restaurant.item].cost} lei`}
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
    </HideKeyboard>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#FFF1CA',
  },
});

export default ManageMenusScreen;

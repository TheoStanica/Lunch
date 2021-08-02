import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AdminField from '../../components/adminField';
import HideKeyboard from '../../components/hideKeyboard';
import {useFocusEffect} from '@react-navigation/native';
import {getMenus, deleteMenu} from '../../redux/thunks/menuThunks';

const ManageMenusScreen = () => {
  const {allMenus, allMenusById} = useSelector(state => state.allMenusReducer);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  const [row, setRow] = useState([]);
  const [previousOpenedRow, setPreviousOpenedRow] = useState(null);

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(
      getMenus(
        {
          filter: {},
          privilege: 'admin',
        },
        () => setIsFetching(false),
      ),
    );
  };
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, []),
  );

  console.log(allMenusById);

  return (
    <SafeAreaView style={styles.container}>
      <HideKeyboard>
        <FlatList
          data={allMenus}
          keyExtractor={menu => menu}
          renderItem={menu => (
            <AdminField
              index={menu.index}
              title={allMenusById[menu.item].restaurantId.name}
              description={`Cost: ${
                allMenusById[menu.item].restaurantId.cost
              } lei`}
              icon="food"
              onDelete={() => dispatch(deleteMenu({_menuId: menu.item}))}
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
});

export default ManageMenusScreen;

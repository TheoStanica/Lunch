import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AdminField from '../../components/adminField';
import HideKeyboard from '../../components/hideKeyboard';
import {useFocusEffect} from '@react-navigation/native';
import {getMenus, deleteMenu} from '../../redux/thunks/menuThunks';

const ManageMenusScreen = () => {
  const {menus, menusById} = useSelector(state => state.menuReducer);
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

  return (
    <HideKeyboard>
      <FlatList
        data={menus}
        keyExtractor={menu => menu}
        contentContainerStyle={styles.container}
        style={styles.container}
        renderItem={menu => (
          <AdminField
            index={menu.index}
            title={menusById[menu.item].name}
            description={`Cost: ${menusById[menu.item].cost} lei`}
            icon="food"
            onDelete={() => dispatch(deleteMenu({_menuId: menu.item}))}
            onEdit={() =>
              navigation.navigate('menuDetailsScreen', {
                menuId: menu.item,
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

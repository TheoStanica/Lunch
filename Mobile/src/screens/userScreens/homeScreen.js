import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../redux/thunks/userThunks';
import {getMenus} from '../../redux/thunks/menuThunks';
import {useFocusEffect} from '@react-navigation/native';
import MenuCard from '../../components/menuCard';

const HomeScreen = ({navigation}) => {
  const {menus, menusById} = useSelector(state => state.menuReducer);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(getUser());
    dispatch(
      getMenus({
        filter: {},
        callback: () => {
          setIsFetching(false);
        },
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
      <FlatList
        data={menus}
        onRefresh={onRefresh}
        refreshing={isFetching}
        keyExtractor={item => item}
        renderItem={({item: _menuId}) => {
          return (
            <MenuCard
              title={menusById[_menuId].restaurantId.name}
              onPress={() =>
                navigation.navigate('MenuDetailsScreen', {
                  menu: menusById[_menuId].menu,
                  menuId: _menuId,
                })
              }
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;

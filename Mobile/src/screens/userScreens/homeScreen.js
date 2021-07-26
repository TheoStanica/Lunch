import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../redux/thunks/userThunks';
import {getMenus} from '../../redux/thunks/menuThunks';
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

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#FFF1CA" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>Menus</Text>
          <FlatList
            data={menus}
            onRefresh={onRefresh}
            refreshing={isFetching}
            keyExtractor={item => item}
            renderItem={({item: _menuId}) => {
              return (
                <MenuCard
                  title={menusById[_menuId].restaurantId?.name}
                  onPress={() =>
                    navigation.navigate('MenuDetailsScreen', {
                      menuId: _menuId,
                    })
                  }
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  title: {
    fontSize: 28,
  },
  body: {
    padding: 15,
  },
});

export default HomeScreen;

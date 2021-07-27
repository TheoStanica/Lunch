import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../redux/thunks/userThunks';
import {getMenus} from '../../redux/thunks/menuThunks';
import MenuCard from '../../components/menuCard';

const HomeScreen = ({navigation}) => {
  const {menus, menusById} = useSelector(state => state.menuReducer);
  const {role} = useSelector(state => state.userReducer);
  const [isFetching, setIsFetching] = useState(true);
  const [fabVisible, setFabVisible] = useState(false);
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
    setFabVisible(true);
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
          {role === 'admin' ? (
            <FAB
              style={styles.fab}
              icon="plus"
              color="white"
              visible={fabVisible}
              animated={true}
              onPress={() => navigation.navigate('CreateMenuScreen')}
            />
          ) : null}
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
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    margin: 40,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;

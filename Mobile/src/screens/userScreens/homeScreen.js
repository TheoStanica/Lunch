import React, {useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, FlatList, View, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getMenus} from '../../redux/thunks/menuThunks';
import MenuCard from '../../components/menuCard';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const {menus, menusById} = useSelector(state => state.menuReducer);
  const {role} = useSelector(state => state.userReducer);
  const [isFetching, setIsFetching] = useState(true);
  const [fabVisible, setFabVisible] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(
      getMenus(
        {
          filter: {
            createdAfter: new Date(moment().startOf('day')),
            createdBefore: new Date(moment().endOf('day')),
          },
          privilege: 'user',
        },
        () => {
          setIsFetching(false);
          setFabVisible(true);
        },
      ),
    );
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, []),
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Menus</Text>
        <FlatList
          style={styles.body}
          data={menus}
          onRefresh={onRefresh}
          refreshing={isFetching}
          keyExtractor={item => item}
          renderItem={({item: _menuId}) => {
            return (
              <MenuCard
                title={menusById[_menuId].restaurantId?.name}
                menuId={menusById[_menuId].id}
                onPress={() =>
                  navigation.navigate('MenuDetailsScreen', {
                    menuId: _menuId,
                  })
                }
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.nothingContainer}>
              <Text>Damn. There are no menus today :(</Text>
            </View>
          )}
          contentContainerStyle={styles.growContainer}
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
    marginHorizontal: 15,
    marginBottom: 10,
  },
  body: {
    marginHorizontal: 15,
  },
  fab: {
    position: 'absolute',
    margin: 40,
    right: 0,
    bottom: 0,
  },
  nothingContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  growContainer: {
    flexGrow: 1,
  },
});

export default HomeScreen;

import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import {useFocusEffect} from '@react-navigation/native';

const MenuAdminDetailsScreen = ({route, navigation}) => {
  const {orders, ordersById} = useSelector(state => state.ordersReducer);
  const {menu} = route.params;
  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(
      getOrder({
        filter: {menuId: menu.id},
        privilege: 'admin',
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
      <Text>Manage Orders Sceen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
});

export default MenuAdminDetailsScreen;

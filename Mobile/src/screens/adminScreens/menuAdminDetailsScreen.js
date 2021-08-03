import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, FlatList, View, Text} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import {useFocusEffect} from '@react-navigation/native';

const MenuAdminDetailsScreen = ({route, navigation}) => {
  const {orders, ordersById} = useSelector(state => state.ordersReducer);
  const {menu} = route.params;
  const dispatch = useDispatch();

  //console.log(menu);
  //console.log(ordersById);
  //console.log(menu.menu.filter(item => item.courseCategory === 'Cirova'));

  const generateSummary = () => {
    const summary = {};

    summary.totalOrders = orders.length;
    summary.totalRestaurantOrders = orders.filter(
      order => ordersById[order].type === 'restaurant',
    ).length;
    summary.totalTakeawayOrders =
      summary.totalOrders - summary.totalRestaurantOrders;
    //console.log(summary);
  };

  generateSummary();
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
      <Text>
        {menu.restaurantId.name} {menu.restaurantId.cost} {menu.createdAt}
      </Text>
      <Text>Manage Orders Sceen</Text>
      <FlatList
        data={orders.filter(order => ordersById[order].type === 'takeaway')}
        keyExtractor={order => order}
        renderItem={order => (
          <View>
            <Text>
              {ordersById[order.item].userId.fullname} (
              {ordersById[order.item].userId.email})
            </Text>
            <FlatList
              data={menu.menu}
              keyExtractor={option => option.index}
              renderItem={option => (
                <Text>
                  {
                    option.item.courses[
                      ordersById[order.item].menuOptions[
                        option.item.courseCategory
                      ]
                    ].description
                  }
                </Text>
              )}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <Text>Manage Orders Sceen</Text>
      <Text>Summary</Text>
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

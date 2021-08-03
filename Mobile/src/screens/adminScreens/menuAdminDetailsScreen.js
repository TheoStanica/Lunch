import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, FlatList, View, Text} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import {useFocusEffect} from '@react-navigation/native';
import {Paragraph, Divider} from 'react-native-paper';
import ProfileField from '../../components/profileField';
import Moment from 'moment';

const MenuAdminDetailsScreen = ({route, navigation}) => {
  const {orders, ordersById} = useSelector(state => state.ordersReducer);
  const {menu} = route.params;
  const dispatch = useDispatch();

  const generateSummary = () => {
    const summary = {};

    summary.totalOrders = orders.length;
    summary.totalRestaurantOrders = orders.filter(
      order => ordersById[order].type === 'restaurant',
    ).length;
    summary.totalTakeawayOrders =
      summary.totalOrders - summary.totalRestaurantOrders;

    return summary;
  };

  const summary = generateSummary();
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
      <SafeAreaView style={styles.header}>
        <ProfileField
          paragraph={menu.restaurantId.name}
          title="Restaurant"
          icon="food-fork-drink"
          iconColor="#4A6572"
        />
        <ProfileField
          paragraph={Moment(menu.restaurantId.createdAt).format('DD-MM-YYYY')}
          title="Created"
          icon="information-variant"
          iconColor="#4A6572"
        />
      </SafeAreaView>
      <Divider style={styles.divider} />
      <SafeAreaView style={styles.body}>
        <FlatList
          data={orders.filter(order => ordersById[order].type === 'takeaway')}
          keyExtractor={order => order}
          renderItem={order => (
            <SafeAreaView>
              <Text style={styles.fullname}>
                {ordersById[order.item].userId.fullname} (
                {ordersById[order.item].userId.email})
              </Text>
              <FlatList
                data={menu.menu}
                keyExtractor={option => option.courseCategory}
                renderItem={option => (
                  <SafeAreaView style={styles.course}>
                    <Paragraph style={styles.courseCategory}>
                      {option.item.courseCategory} -{' '}
                    </Paragraph>
                    <Paragraph style={styles.capitalizedText}>
                      {
                        option.item.courses[
                          ordersById[order.item].menuOptions[
                            option.item.courseCategory
                          ]
                        ].description
                      }
                    </Paragraph>
                  </SafeAreaView>
                )}
              />
            </SafeAreaView>
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      <Divider style={styles.divider} />
      <SafeAreaView style={styles.header}>
        <Text style={styles.titleSummary}>Summary</Text>
        <Text style={styles.summary}>Total orders: {summary.totalOrders}</Text>
        <Text style={styles.summary}>
          Total restaurant orders: {summary.totalRestaurantOrders}
        </Text>
        <Text style={styles.summary}>
          Total takeaway orders: {summary.totalTakeawayOrders}
        </Text>
        <Text style={styles.summary}>
          Total takeaway cost:{' '}
          {menu.restaurantId.cost * summary.totalTakeawayOrders}
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  header: {
    flex: 1,
    marginLeft: 10,
  },
  body: {
    flex: 3.5,
  },
  course: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
  },
  courseCategory: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
  fullname: {
    fontSize: 20,
    marginLeft: 10,
  },
  divider: {
    marginVertical: 5,
    borderWidth: 0.5,
  },
  summary: {
    fontSize: 15,
    marginVertical: 2.5,
  },
  titleSummary: {
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default MenuAdminDetailsScreen;

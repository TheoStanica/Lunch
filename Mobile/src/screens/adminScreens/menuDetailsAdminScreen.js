import React, {useCallback, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import {useFocusEffect} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import ProfileField from '../../components/profileField';
import Statistics from '../../components/statistics';
import MenuOptions from '../../components/menuOptions';
import Moment from 'moment';

const MenuDetailsAdminScreen = ({route}) => {
  const {orders, ordersById} = useSelector(state => state.ordersReducer);
  const [summary, setSummary] = useState({});
  const {menu} = route.params;
  const dispatch = useDispatch();

  const generateSummary = () => {
    const summary = {},
      totalMenuOptions = [];
    let courses = [];

    summary.totalOrders = orders.length;
    summary.totalRestaurantOrders = orders.filter(
      order => ordersById[order].type === 'restaurant',
    ).length;
    summary.totalTakeawayOrders =
      summary.totalOrders - summary.totalRestaurantOrders;

    menu.menu.forEach(menu => {
      menu.courses.forEach((course, index) => {
        courses.push({
          description: course.description,
          count: Object.values(ordersById).filter(order => {
            if (order.type === 'restaurant') return false;
            return order.menuOptions[menu.courseCategory] === index;
          }).length,
        });
      });
      totalMenuOptions.push({
        courseCategory: menu.courseCategory,
        courses: courses,
      });
      courses = [];
    });

    summary.totalMenuOptions = totalMenuOptions;
    summary.totalTakeawayCost =
      menu.restaurantId.cost * summary.totalTakeawayOrders;
    summary.totalCost = menu.restaurantId.cost * summary.totalOrders;

    return summary;
  };

  const onRefresh = () => {
    dispatch(
      getOrder({
        filter: {menuId: menu.id},
        privilege: 'admin',
      }),
    );
  };

  useEffect(() => {
    setSummary(generateSummary());
  }, [orders]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.body}>
        <ProfileField
          paragraph={menu.restaurantId.name}
          title="Restaurant"
          icon="food"
          iconColor="#4A6572"
        />
        <ProfileField
          paragraph={Moment(menu.createdAt).format('DD-MM-YYYY')}
          title="Created"
          icon="information-variant"
          iconColor="#4A6572"
        />
      </SafeAreaView>
      <Divider style={styles.divider} />
      <Text style={styles.titleSummary}>Summary</Text>
      <Statistics
        totalOrders={summary.totalOrders}
        totalRestaurantOrders={summary.totalRestaurantOrders}
        totalTakeawayOrders={summary.totalTakeawayOrders}
        totalTakeawayCost={summary.totalTakeawayCost}
        totalCost={summary.totalCost}
      />
      <Divider style={styles.divider} />
      <Text style={styles.titleSummary}>Menu Options</Text>
      <MenuOptions menuOptions={summary.totalMenuOptions} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  body: {
    marginLeft: 10,
  },
  divider: {
    marginVertical: 5,
    borderWidth: 0.5,
  },
  orderDivider: {
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: '#4A6572',
    marginHorizontal: 10,
  },
  titleSummary: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MenuDetailsAdminScreen;

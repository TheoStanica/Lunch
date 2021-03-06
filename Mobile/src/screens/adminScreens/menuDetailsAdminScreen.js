import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {resetOrdersAction} from '../../redux/actions/ordersActions';
import ProfileField from '../../components/profileField';
import {getOrder} from '../../redux/thunks/orderThunks';
import {getMenus} from '../../redux/thunks/menuThunks';
import MenuOptions from '../../components/menuOptions';
import Statistics from '../../components/statistics';
import Moment from 'moment';

const MenuDetailsAdminScreen = ({route}) => {
  const {orders, ordersById, allMenusById} = useSelector(state => ({
    ...state.ordersReducer,
    ...state.allMenusReducer,
  }));
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [summary, setSummary] = useState({});
  const {menuId} = route.params;
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

    allMenusById[menuId].menu.forEach(menu => {
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
      allMenusById[menuId].restaurantId.cost * summary.totalTakeawayOrders;
    summary.totalCost =
      allMenusById[menuId].restaurantId.cost * summary.totalOrders;

    return summary;
  };

  const fetchOrder = () => {
    dispatch(
      getOrder(
        {
          filter: {menuId, status: 'active'},
          privilege: 'admin',
        },
        () => setHasFetchedOrders(true),
      ),
    );
  };

  const fetchMenu = () => {
    dispatch(
      getMenus({
        filter: {_id: menuId},
        privilege: 'admin',
      }),
    );
  };

  useEffect(() => {
    if (!allMenusById?.[menuId]) {
      fetchMenu();
    } else {
      if (!hasFetchedOrders) {
        fetchOrder();
      } else {
        setSummary(generateSummary());
        setIsFetching(false);
      }
    }
  }, [allMenusById, orders]);

  useEffect(() => {
    return () => {
      dispatch(resetOrdersAction());
    };
  }, []);

  return isFetching ? (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ActivityIndicator color="#4A6572" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.body}>
        <ProfileField
          paragraph={allMenusById[menuId]?.restaurantId.name}
          title="Restaurant"
          icon="food"
          iconColor="#4A6572"
        />
        <ProfileField
          paragraph={Moment(allMenusById[menuId]?.createdAt).format(
            'DD-MM-YYYY',
          )}
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

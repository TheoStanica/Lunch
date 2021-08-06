import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import DateTimePicker from '../../components/timePicker';
import {Title, Divider} from 'react-native-paper';
import moment from 'moment';

const ManageOrdersScreen = () => {
  const {orders, ordersById} = useSelector(state => state.ordersReducer);
  const [orderStart, setOrderStart] = useState(
    moment(Date.now()).format('DD-MM-YYYY'),
  );
  const [orderEnd, setOrderEnd] = useState(
    moment(Date.now()).format('DD-MM-YYYY'),
  );
  const [statistics, setStatistics] = useState({});
  const dispatch = useDispatch();

  const generateStatistics = () => {
    let restaurants = {},
      statistics = {
        totalOrders: 0,
        totalTakeawayOrders: 0,
        totalRestaurantOrders: 0,
        totalTakeawayCost: 0,
        totalCost: 0,
      };

    Object.values(ordersById).forEach(order => {
      const restaurant = order.menuId.restaurantId;
      console.log(order);
      if (!restaurants[restaurant.name]) {
        restaurants[restaurant.name] = {
          totalOrders: 0,
          totalTakeawayOrders: 0,
          totalRestaurantOrders: 0,
          totalTakeawayCost: 0,
          totalCost: 0,
        };
      }

      if (order.status === 'active') {
        restaurants[restaurant.name].totalOrders++;
        restaurants[restaurant.name].totalCost += restaurant.cost;
        if (order.type === 'takeaway') {
          restaurants[restaurant.name].totalTakeawayOrders++;
          restaurants[restaurant.name].totalTakeawayCost += restaurant.cost;
        }
      }
    });

    console.log(restaurants);
    statistics.restaurants = restaurants;
    return statistics;
  };

  useEffect(() => {
    dispatch(
      getOrder({
        filter: {
          createdAfter: new Date(
            moment(orderStart, 'DD-MM-YYYY').startOf('day').format(),
          ),
          createdBefore: new Date(
            moment(orderEnd, 'DD-MM-YYYY').endOf('day').format(),
          ),
        },
        privilege: 'admin',
      }),
    );
  }, [orderStart, orderEnd]);

  useEffect(() => {
    setStatistics(generateStatistics());
  }, [orders]);

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>Select a period of time for statistics</Title>
      <DateTimePicker
        title="Start"
        description={orderStart}
        date={new Date(moment(orderStart, 'DD-MM-YYYY').format())}
        onConfirm={date => setOrderStart(moment(date).format('DD-MM-YYYY'))}
        mode="date"
      />
      <DateTimePicker
        title="End"
        description={orderEnd}
        date={new Date(moment(orderEnd, 'DD-MM-YYYY').format())}
        onConfirm={date => setOrderEnd(moment(date).format('DD-MM-YYYY'))}
        mode="date"
      />
      <Divider style={styles.divider} />
      <Title style={styles.title}>Statistics</Title>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  divider: {
    marginVertical: 5,
    borderWidth: 0.5,
  },
  title: {
    alignSelf: 'center',
  },
});

export default ManageOrdersScreen;

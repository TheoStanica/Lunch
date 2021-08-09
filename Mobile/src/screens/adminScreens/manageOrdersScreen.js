import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import {Title, Divider} from 'react-native-paper';
import {getRestaurants} from '../../redux/thunks/restaurantThunks';
import {getAllUsers} from '../../redux/thunks/userThunks';
import DateTimePicker from '../../components/timePicker';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

const ManageOrdersScreen = ({navigation}) => {
  const {orders, ordersById} = useSelector(state => state.ordersReducer);
  const {restaurants, restaurantsById} = useSelector(
    state => state.restaurantReducer,
  );
  const {allUsers, allUsersById} = useSelector(state => state.allUsersReducer);
  const [orderStart, setOrderStart] = useState(
    moment(Date.now()).format('DD-MM-YYYY'),
  );
  const [orderEnd, setOrderEnd] = useState(
    moment(Date.now()).format('DD-MM-YYYY'),
  );
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openSecondDropDown, setOpenSecondDropDown] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [statistics, setStatistics] = useState({});
  const dispatch = useDispatch();

  const generateStatistics = () => {
    let restaurants = {},
      users = {},
      statistics = {};

    Object.values(ordersById).forEach(order => {
      const restaurant = order.menuId.restaurantId;
      const user = order.userId;

      if (!restaurants[restaurant.name])
        restaurants[restaurant.name] = {
          totalOrders: 0,
          totalTakeawayOrders: 0,
          totalRestaurantOrders: 0,
          totalTakeawayCost: 0,
          totalCost: 0,
        };

      if (order.status === 'active') {
        restaurants[restaurant.name].totalOrders++;
        restaurants[restaurant.name].totalCost += restaurant.cost;
        if (order.type === 'takeaway') {
          restaurants[restaurant.name].totalTakeawayOrders++;
          restaurants[restaurant.name].totalTakeawayCost += restaurant.cost;
        }
      }
      Object.values(restaurants).forEach(restaurant => {
        restaurant.totalRestaurantOrders =
          restaurant.totalOrders - restaurant.totalTakeawayOrders;
      });

      if (selectedUser === '' || selectedUser === user.id) {
        if (selectedRestaurant === '' || selectedRestaurant === restaurant.id) {
          if (!users[user.email] || !users[user.email][restaurant.name])
            users[user.email] = {
              ...users[user.email],
              [restaurant.name]: {
                totalOrders: 0,
                totalTakeawayOrders: 0,
                totalRestaurantOrders: 0,
                totalTakeawayCost: 0,
                totalCost: 0,
              },
            };

          if (order.status === 'active') {
            users[user.email][restaurant.name].totalOrders++;
            users[user.email][restaurant.name].totalCost += restaurant.cost;
            if (order.type === 'takeaway') {
              users[user.email][restaurant.name].totalTakeawayOrders++;
              users[user.email][restaurant.name].totalTakeawayCost +=
                restaurant.cost;
            }
          }

          Object.values(users).forEach(user => {
            Object.values(user).forEach(restaurant => {
              restaurant.totalRestaurantOrders =
                restaurant.totalOrders - restaurant.totalTakeawayOrders;
            });
          });
        }
      }
    });

    statistics.restaurants = restaurants;
    statistics.users = users;

    return statistics;
  };

  const generateRestaurantItems = () => {
    const items = [];

    items.push({label: 'All restaurants', value: ''});
    restaurants.forEach(restaurantId => {
      if (restaurantsById[restaurantId].status === 'active')
        items.push({
          label: restaurantsById[restaurantId].name,
          value: restaurantsById[restaurantId].id,
        });
    });

    return items;
  };

  const generateUsersItems = () => {
    const items = [];
    items.push({label: 'All users', value: ''});
    allUsers.forEach(userId => {
      if (allUsersById[userId].status === 'active')
        items.push({
          label: allUsersById[userId].fullname,
          value: allUsersById[userId].id,
        });
    });

    return items;
  };

  useEffect(() => {
    dispatch(getRestaurants());
    dispatch(getAllUsers());
  }, []);

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
  }, [orderStart, orderEnd, selectedUser, selectedRestaurant]);

  useEffect(() => {
    const statistics = generateStatistics();

    setStatistics(statistics);
    navigation.setParams({statistics});
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
      <SafeAreaView style={styles.restaurantContainer(2000)}>
        <Text>Restaurant </Text>
        <DropDownPicker
          open={openDropDown}
          value={selectedRestaurant}
          setValue={setSelectedRestaurant}
          setOpen={setOpenDropDown}
          items={generateRestaurantItems()}
          style={styles.dropDownPicker}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          placeholder="All restaurants"
          style={styles.dropdownStyle}
          selectedItemContainerStyle={{backgroundColor: '#4A6572'}}
          selectedItemLabelStyle={styles.selectedItemLabel}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.restaurantContainer(1000)}>
        <Text>User </Text>
        <DropDownPicker
          open={openSecondDropDown}
          value={selectedUser}
          setValue={setSelectedUser}
          setOpen={setOpenSecondDropDown}
          items={generateUsersItems()}
          style={styles.dropDownPicker}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          placeholder="All users"
          style={styles.dropdownStyle}
          selectedItemContainerStyle={{backgroundColor: '#4A6572'}}
          selectedItemLabelStyle={styles.selectedItemLabel}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </SafeAreaView>
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
  dropdownStyle: {
    backgroundColor: 'transparent',
    borderColor: '#0007',
    borderWidth: 0.3,
  },
  selectedItemLabel: {
    color: 'white',
  },
  dropdownContainer: {
    backgroundColor: '#FFF1CA',
    borderColor: '#0007',
    borderWidth: 0.3,
  },
  restaurantContainer: zIndex => ({
    marginHorizontal: 15,
    marginVertical: 5,
    zIndex: zIndex,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  }),
});

export default ManageOrdersScreen;

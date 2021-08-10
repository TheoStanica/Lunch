import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, FlatList, View} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import {Title, Divider, List} from 'react-native-paper';
import {getRestaurants} from '../../redux/thunks/restaurantThunks';
import {getAllUsers} from '../../redux/thunks/userThunks';
import DateTimePicker from '../../components/timePicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDropDownPicker from '../../components/customDropDownPicker';
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
    const emptyObject = () => {
        return {
          totalOrders: 0,
          totalTakeawayOrders: 0,
          totalRestaurantOrders: 0,
          totalTakeawayCost: 0,
          totalCost: 0,
        };
      },
      updateStatistics = (order, restaurant, cost) => {
        if (order.status === 'active') {
          restaurant.totalOrders++;
          restaurant.totalCost += cost;
          if (order.type === 'takeaway') {
            restaurant.totalTakeawayOrders++;
            restaurant.totalTakeawayCost += cost;
          }
        }
      };
    let restaurants = {},
      users = {};

    Object.values(ordersById).forEach(order => {
      const restaurant = order.menuId.restaurantId;
      const user = order.userId;

      if (!restaurants[restaurant.name])
        restaurants[restaurant.name] = emptyObject();
      updateStatistics(order, restaurants[restaurant.name], restaurant.cost);

      Object.values(restaurants).forEach(restaurant => {
        restaurant.totalRestaurantOrders =
          restaurant.totalOrders - restaurant.totalTakeawayOrders;
      });

      if (selectedUser === '' || selectedUser === user.id) {
        if (selectedRestaurant === '' || selectedRestaurant === restaurant.id) {
          const key = user.fullname + ' (' + user.email + ')';

          if (!users[key] || !users[key][restaurant.name])
            users[key] = {
              ...users[key],
              [restaurant.name]: emptyObject(),
            };
          updateStatistics(order, users[key][restaurant.name], restaurant.cost);

          Object.values(users).forEach(user => {
            Object.values(user).forEach(restaurant => {
              if (restaurant)
                restaurant.totalRestaurantOrders =
                  restaurant.totalOrders - restaurant.totalTakeawayOrders;
            });
          });
        }
      }
    });

    return {restaurants, users};
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
      <CustomDropDownPicker
        text="Restaurant"
        openDropDown={openDropDown}
        selectedItem={selectedRestaurant}
        setSelectedItem={setSelectedRestaurant}
        setOpenDropDown={setOpenDropDown}
        items={generateRestaurantItems()}
        placeholder="All restaurants"
        zIndex={2000}
      />
      <CustomDropDownPicker
        text="User"
        openDropDown={openSecondDropDown}
        selectedItem={selectedUser}
        setSelectedItem={setSelectedUser}
        setOpenDropDown={setOpenSecondDropDown}
        items={generateUsersItems()}
        placeholder="All users"
      />
      <Divider style={styles.divider} />
      <Title style={styles.title}>Statistics</Title>
      <FlatList
        data={Object.entries(statistics.users ? statistics.users : {})}
        keyExtractor={item => item}
        renderItem={user => (
          <List.Item
            style={styles.itemContainer('#fff7e0')}
            title={user.item[0]}
            titleStyle={styles.listTitle}
            onPress={() =>
              navigation.navigate('UserRestaurantOrdersScreen', {user: user})
            }
            left={() => (
              <View style={styles.icon}>
                <Icon size={30} name={'account'} color={'#4A6572'} />
              </View>
            )}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
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
  listTitle: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  itemContainer: backgroundColor => ({
    backgroundColor: backgroundColor,
  }),
  icon: {
    marginLeft: 10,
  },
  containerStyle: {
    backgroundColor: '#FFF1CA',
    padding: 20,
    margin: 20,
  },
});

export default ManageOrdersScreen;

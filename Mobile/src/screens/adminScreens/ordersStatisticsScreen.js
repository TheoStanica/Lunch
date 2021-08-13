import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import {Title} from 'react-native-paper';
import {getRestaurants} from '../../redux/thunks/restaurantThunks';
import {getAllUsers} from '../../redux/thunks/userThunks';
import DateTimePicker from '../../components/timePicker';
import CustomDropDownPicker from '../../components/customDropDownPicker';
import ActionButton from '../../components/actionButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const OrderStatisticsScreen = ({navigation}) => {
  const {ordersById} = useSelector(state => state.ordersReducer);
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

  const generateItems = (label, values, valuesById, name = 'name') => {
    const items = [];

    items.push({label: label, value: ''});
    values.forEach(valueId => {
      if (valuesById[valueId].status === 'active')
        items.push({
          label: valuesById[valueId][name],
          value: valuesById[valueId].id,
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
  }, [orderStart, orderEnd]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="file-pdf-outline"
          size={35}
          color="black"
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('ManagePdfScreen')}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Title style={styles.title}>
            Select a period of time for statistics
          </Title>
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
            items={generateItems(
              'All restaurants',
              restaurants,
              restaurantsById,
            )}
            placeholder="All restaurants"
            zIndex={2000}
          />
          <CustomDropDownPicker
            text="User"
            openDropDown={openSecondDropDown}
            selectedItem={selectedUser}
            setSelectedItem={setSelectedUser}
            setOpenDropDown={setOpenSecondDropDown}
            items={generateItems(
              'All Users',
              allUsers,
              allUsersById,
              'fullname',
            )}
            placeholder="All users"
          />
        </View>
        <View>
          <ActionButton
            style={styles.button}
            text="Generate Statistics"
            onPress={() =>
              navigation.navigate('OrderDetailsTab', {
                statistics: generateStatistics(),
              })
            }
          />
          <ActionButton
            style={styles.button}
            text="Generate PDF"
            onPress={() => navigation.navigate('ManagePdfScreen')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
  },
  button: {
    margin: 10,
  },
});

export default OrderStatisticsScreen;

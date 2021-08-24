import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {getOrder} from '../../redux/thunks/orderThunks';
import {Title} from 'react-native-paper';
import {getRestaurants} from '../../redux/thunks/restaurantThunks';
import {getAllUsers} from '../../redux/thunks/userThunks';
import {htmlStatistics} from '../../assets/htmlFiles/htmlStatistics';
import DateTimePicker from '../../components/timePicker';
import CustomDropDownPicker from '../../components/customDropDownPicker';
import ActionButton from '../../components/actionButton';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
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

  const generateItems = (values, valuesById, name = 'name') => {
    const items = [];

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
          status: 'active',
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
          onPress={() => navigation.navigate('PdfStack')}
        />
      ),
    });
  }, []);

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        alert(error);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async ({fileName}) => {
    if (await isPermitted()) {
      const options = {
        html: htmlStatistics(generateStatistics()),
        fileName: fileName,
      };

      try {
        const RNFS = require('react-native-fs');
        const docDirPath = RNFS.DocumentDirectoryPath + '/statistics';
        const file = await RNHTMLtoPDF.convert(options);

        if (!(await RNFS.exists(docDirPath))) await RNFS.mkdir(docDirPath);
        await RNFS.moveFile(
          file.filePath,
          docDirPath + '/' + fileName + '.pdf',
        );

        navigation.push('PdfStack');
        navigation.navigate('PdfStack', {
          screen: 'PdfScreen',
          params: {
            path: docDirPath + '/' + fileName + '.pdf',
          },
        });
      } catch (error) {
        alert(error);
      }
    }
  };

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
            setSelectedItem={setSelectedRestaurant}
            items={generateItems(restaurants, restaurantsById)}
            placeholder={{
              label: 'All restaurants',
              value: '',
            }}
          />
          <CustomDropDownPicker
            text="User"
            setSelectedItem={setSelectedUser}
            items={generateItems(allUsers, allUsersById, 'fullname')}
            placeholder={{
              label: 'All Users',
              value: '',
            }}
          />
        </View>
        <View>
          <ActionButton
            style={styles.button}
            text="View Statistics"
            onPress={() =>
              navigation.navigate('OrderDetailsTab', {
                statistics: generateStatistics(),
              })
            }
          />
          <ActionButton
            style={styles.button}
            textStyle={styles.textStyle}
            text="Generate PDF Reports"
            onPress={() =>
              createPDF({
                fileName: `Statistics${moment(Date.now()).format(
                  'DD-MM-YYYY hh-mm-ss',
                )}`,
              })
            }
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
  textStyle: {
    textTransform: 'none',
  },
  button: {
    margin: 10,
  },
});

export default OrderStatisticsScreen;

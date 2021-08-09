import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {
  List,
  Text,
  Headline,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  createOrder,
  getOrder,
  updateOrder,
} from '../../redux/thunks/orderThunks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from '../../components/actionButton';
import AnimatedHeader from '../../components/animatedHeader';
import ProfileField from '../../components/profileField';
import {updateMenuAction} from '../../redux/actions/menuActions';
import moment from 'moment';
import {useTimer} from 'react-timer-hook';

const isMenuExpired = cancelAt =>
  moment().isAfter(moment(cancelAt, 'LT').format());

const getExpireTimestamp = cancelAt => {
  return new Date(moment(cancelAt, 'LT').format());
};

const MenuDetailsScreen = ({navigation, route}) => {
  const {menuId} = route.params;
  const {menusById, id, email} = useSelector(state => ({
    ...state.menuReducer,
    ...state.userReducer,
  }));
  const offset = useRef(new Animated.Value(0)).current;
  const [isFetchingOrder, setIsFetchingOrder] = useState(true);
  const [order, setOrder] = useState('');
  const [menuExpired, setMenuExpired] = useState(
    isMenuExpired(menusById[menuId].restaurantId.cancelAt),
  );
  const dispatch = useDispatch();

  useTimer({
    expiryTimestamp: getExpireTimestamp(
      menusById[menuId].restaurantId.cancelAt,
    ),
    onExpire: () => setMenuExpired(true),
  });

  useEffect(() => {
    dispatch(
      getOrder({filter: {userId: id, menuId: menuId}}, res => {
        if (res?.orders.length > 0) {
          setOrder(res.orders[0]);
        }
        setIsFetchingOrder(false);
      }),
    );
  }, []);

  const renderOrderItemSelected = (courseCategory, idx) => {
    return order?.status === 'active' &&
      order?.type === 'takeaway' &&
      order?.menuOptions[courseCategory] === idx ? (
      <Icon size={24} name="check" color="#4A6572" />
    ) : null;
  };

  const renderCourses = ({courseCategory, courses}) =>
    courses.map((course, idx) => (
      <View
        style={styles.courseDetails}
        key={`${menuId}-${course.courseCategory}-${idx}`}>
        {renderOrderItemSelected(courseCategory, idx)}
        <Paragraph style={styles.capitalizedText}>
          {course.description}
        </Paragraph>
        {course.requiredType === 'takeaway' ||
        course.requiredType === 'restaurant' ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              style={styles.icon}
              size={24}
              name={
                course.requiredType === 'takeaway' ? 'package-variant' : 'run'
              }
              color="#4A6572"
            />
          </View>
        ) : null}
      </View>
    ));

  const renderCourseTypes = () =>
    menusById[menuId].menu.map((menuCourse, idx) => (
      <View style={styles.courseTypeContainer} key={`${menuId}-${idx}`}>
        <Headline style={styles.capitalizedText}>
          {menuCourse.courseCategory}
        </Headline>
        {renderCourses({
          courses: menuCourse.courses,
          courseCategory: menuCourse.courseCategory,
        })}
      </View>
    ));

  const removeUserFromGoingList = id => {
    dispatch(
      updateMenuAction({
        menuId,
        updated: {
          ...menusById[menuId],
          usersGoing: menusById[menuId].usersGoing.filter(
            user => user.id !== id,
          ),
        },
      }),
    );
  };

  const renderActiveOrderOptions = () => {
    return (
      <>
        <ActionButton
          text="cancel order"
          disabled={menuExpired}
          style={[
            order.type === 'takeaway' ? styles.leftButton : {flex: 1},
            styles.cancelButton(menuExpired),
          ]}
          onPress={cancelOrder}
        />
        {order.type === 'takeaway' ? (
          <ActionButton
            text="update order"
            disabled={menuExpired}
            style={styles.rightButton}
            onPress={() => navigateToOrderScreen(menuId, order)}
          />
        ) : null}
      </>
    );
  };

  const renderOrderButtons = orderId => {
    return (
      <>
        <ActionButton
          text="Restaurant"
          disabled={menuExpired}
          style={styles.leftButton}
          onPress={submitOrder}
        />
        <ActionButton
          text="Takeaway"
          disabled={menuExpired}
          style={styles.rightButton}
          onPress={() => navigateToOrderScreen(menuId, order)}
        />
      </>
    );
  };

  const navigateToOrderScreen = (menuId, order) => {
    navigation.navigate('MenuTakeawayOrderScreen', {menuId, order});
  };

  const renderOrderOptions = () => {
    return (
      <View style={styles.buttons}>
        {order.status === 'active'
          ? renderActiveOrderOptions()
          : renderOrderButtons(order.id)}
      </View>
    );
  };

  const renderGoingList = () => {
    return (
      <List.Accordion
        title="Going (Restaurant)"
        style={styles.accordion}
        theme={{colors: {primary: 'white', text: 'white'}}}>
        {menusById[menuId].usersGoing.map(user => (
          <ProfileField
            key={user.email}
            title={email === user.email ? 'You' : user.fullname}
            paragraph={user.email}
            iconColor="#4A6572"
            icon="account-circle-outline"
          />
        ))}
      </List.Accordion>
    );
  };

  const cancelOrder = () => {
    dispatch(
      updateOrder(
        {
          orderId: order.id,
          status: 'cancelled',
        },
        () => {
          if (order.type === 'restaurant') {
            removeUserFromGoingList(id);
          }
          setOrder({...order, status: 'cancelled'});
        },
      ),
    );
  };

  const submitOrder = () => {
    if (!order) {
      dispatch(
        createOrder(
          {
            menuId: menuId,
            userId: id,
            type: 'restaurant',
            menuOptions: undefined,
          },
          sendSuccessMessage,
        ),
      );
    } else {
      dispatch(
        updateOrder(
          {
            orderId: order.id,
            status: 'active',
            type: 'restaurant',
          },
          sendSuccessMessage,
        ),
      );
    }
  };

  const sendSuccessMessage = () => {
    navigation.reset({
      routes: [
        {name: 'HomeScreen'},
        {
          name: 'MessageScreen',
          params: {message: 'Order created!'},
        },
      ],
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AnimatedHeader
          animatedValue={offset}
          textContainerColor={menuExpired ? '#A52630' : undefined}
          description={
            menuExpired
              ? 'Expired'
              : `Expires at ${menusById[menuId].restaurantId.cancelAt}`
          }
          title={menusById[menuId].restaurantId.name}
        />
        {!isFetchingOrder ? (
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {useNativeDriver: false},
            )}>
            <View style={styles.body}>
              <View style={{marginBottom: 15}}>
                {renderCourseTypes()}
                {renderGoingList()}
              </View>
              {!order.status ? (
                <View style={styles.buttons}>{renderOrderButtons()}</View>
              ) : (
                renderOrderOptions()
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#4A6572" />
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftButton: {
    flex: 1,
    marginRight: 7.5,
  },
  rightButton: {
    flex: 1,
    marginLeft: 7.5,
  },
  body: {
    flex: 1,
    flexGrow: 1,
    margin: 15,
    justifyContent: 'space-between',
  },
  going: {
    flexDirection: 'row',
  },
  courseCategory: {
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseTypeContainer: {
    marginBottom: 20,
  },
  courseDetails: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  scrollViewContainer: {
    paddingTop: 220,
    flexGrow: 1,
  },
  icon: {
    marginLeft: 10,
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
  loadingContainer: {
    paddingTop: 220,
    flex: 1,
    justifyContent: 'center',
  },
  accordion: {
    backgroundColor: '#4A6572',
  },
  accordionTitle: {
    color: 'white',
  },
  cancelButton: menuExpired => ({
    backgroundColor: menuExpired ? '#A5263055' : '#A52630',
  }),
});

export default MenuDetailsScreen;

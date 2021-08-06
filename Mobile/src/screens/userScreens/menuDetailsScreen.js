import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {
  Title,
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

const MenuDetailsScreen = ({navigation, route}) => {
  const {menuId} = route.params;
  const {menusById} = useSelector(state => state.menuReducer);
  const {id} = useSelector(state => state.userReducer);
  const offset = useRef(new Animated.Value(0)).current;
  const [isFetchingOrder, setIsFetchingOrder] = useState(true);
  const [order, setOrder] = useState('');
  const dispatch = useDispatch();

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
                course.requiredType === 'takeaway'
                  ? 'package-variant'
                  : 'food-fork-drink'
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

  const renderActiveOrderOptions = () => {
    return (
      <>
        <ActionButton
          text="cancel order"
          style={[styles.leftButton, {backgroundColor: 'red'}]}
          onPress={cancelOrder}
        />
        {order.type === 'takeaway' ? (
          <ActionButton
            text="update order"
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
          style={styles.leftButton}
          onPress={submitOrder}
        />
        <ActionButton
          text="Takeaway"
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

  const cancelOrder = () => {
    dispatch(
      updateOrder(
        {
          orderId: order.id,
          status: 'cancelled',
        },
        () => setOrder({...order, status: 'cancelled'}),
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
              <View>
                {renderCourseTypes()}
                <View style={styles.going}>
                  <Title>Going</Title>
                  <Icon name="information" size={30} />
                </View>
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
});

export default MenuDetailsScreen;

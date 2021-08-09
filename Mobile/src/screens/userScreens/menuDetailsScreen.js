import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {ActivityIndicator, Appbar, Menu} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  createOrder,
  getOrder,
  updateOrder,
} from '../../redux/thunks/orderThunks';
import ActionButton from '../../components/actionButton';
import AnimatedHeader from '../../components/animatedHeader';
import {updateMenuAction} from '../../redux/actions/menuActions';
import useMenuExpired from '../../hooks/useMenuExpired';
import DisplayMenu from '../../components/displayMenu';

const MenuDetailsScreen = ({navigation, route}) => {
  const {menuId} = route.params;
  const {menusById, id} = useSelector(state => ({
    ...state.menuReducer,
    ...state.userReducer,
  }));
  const offset = useRef(new Animated.Value(0)).current;
  const [isFetchingOrder, setIsFetchingOrder] = useState(true);
  const [order, setOrder] = useState('');
  const menuExpired = useMenuExpired({menuId});
  const [isMenuHeaderVisible, setIsMenuHeaderVisible] = useState(false);
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          visible={isMenuHeaderVisible}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setIsMenuHeaderVisible(true)}
            />
          }
          onDismiss={() => setIsMenuHeaderVisible(false)}>
          <Menu.Item
            title="Going (Restaurant)"
            onPress={() => {
              setIsMenuHeaderVisible(false);
              navigation.navigate('UsersGoingScreen', {menuId});
            }}
          />
        </Menu>
      ),
    });
  }, [isMenuHeaderVisible]);

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
              <DisplayMenu menuId={menuId} order={order} />
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
  scrollViewContainer: {
    paddingTop: 220,
    flexGrow: 1,
  },
  loadingContainer: {
    paddingTop: 220,
    flex: 1,
    justifyContent: 'center',
  },
  cancelButton: menuExpired => ({
    backgroundColor: menuExpired ? '#A5263055' : '#A52630',
  }),
});

export default MenuDetailsScreen;

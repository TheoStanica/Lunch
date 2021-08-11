import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder, updateOrder} from '../redux/thunks/orderThunks';
import ActionButton from './actionButton';
import useMenuExpired from '../hooks/useMenuExpired';
import {useNavigation} from '@react-navigation/native';
import useOnlyRequiredType from '../hooks/useOnlyRequiredType';

const MenuDetailsButtons = ({
  foundOrder,
  menuId,
  onCancelRestaurant,
  onCancelTakeaway,
}) => {
  const {id, menusById} = useSelector(state => ({
    ...state.userReducer,
    ...state.menuReducer,
  }));
  const hasOnlyRestaurant = useOnlyRequiredType({type: 'restaurant', menuId});
  const hasOnlyTakeaway = useOnlyRequiredType({type: 'takeaway', menuId});
  const menuExpired = useMenuExpired({menuId});
  const [order, setOrder] = useState(foundOrder);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToOrderScreen = (menuId, order) => {
    navigation.navigate('MenuTakeawayOrderScreen', {menuId, order});
  };

  const handleTakeaway = (menuId, order) => {
    const filteredMenus = menusById[menuId].menu.map(menu => ({
      ...menu,
      courses: menu.courses.filter(
        course => course.requiredType !== 'restaurant',
      ),
    }));

    if (filteredMenus.every(menu => menu.courses.length === 1)) {
      const menuOptions = {};
      menusById[menuId].menu.forEach(
        menu => (menuOptions[menu.courseCategory] = 0),
      );

      handleSubmit({menuId, type: 'takeaway', menuOptions});
    } else {
      navigateToOrderScreen(menuId, order);
    }
  };

  const handleSubmit = ({menuId, type, menuOptions}) => {
    if (!order) {
      dispatch(
        createOrder(
          {
            menuId,
            userId: id,
            type,
            menuOptions,
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
            type,
            menuOptions,
          },
          sendSuccessMessage,
        ),
      );
    }
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
            onCancelRestaurant();
          }
          if (order.type === 'takeaway') {
            onCancelTakeaway();
          }
          setOrder({...order, status: 'cancelled'});
        },
      ),
    );
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

  const renderOrderOptions = () => {
    return (
      <View style={styles.buttons}>
        {order.status === 'active'
          ? renderActiveOrderOptions()
          : renderOrderButtons(order.id)}
      </View>
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
            onPress={() => handleTakeaway(menuId, order)}
          />
        ) : null}
      </>
    );
  };

  const renderOrderButtons = orderId => {
    return (
      <>
        {!hasOnlyTakeaway ? (
          <ActionButton
            text="Restaurant"
            disabled={menuExpired}
            style={styles.leftButton}
            onPress={() => handleSubmit({menuId, type: 'restaurant'})}
          />
        ) : null}
        {!hasOnlyRestaurant ? (
          <ActionButton
            text="Takeaway"
            disabled={menuExpired}
            style={styles.rightButton}
            onPress={() => handleTakeaway(menuId, order)}
          />
        ) : null}
      </>
    );
  };

  return !order.status ? (
    <View style={styles.buttons}>{renderOrderButtons()}</View>
  ) : (
    renderOrderOptions()
  );
};

const styles = StyleSheet.create({
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
  cancelButton: menuExpired => ({
    backgroundColor: menuExpired ? '#A5263055' : '#A52630',
  }),
});

export default MenuDetailsButtons;

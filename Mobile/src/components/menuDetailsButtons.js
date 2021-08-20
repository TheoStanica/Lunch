import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import useMenuExpired from '../hooks/useMenuExpired';
import useOnlyRequiredType from '../hooks/useOnlyRequiredType';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder, updateOrder} from '../redux/thunks/orderThunks';
import {useNavigation} from '@react-navigation/native';
import ActionButton from './actionButton';

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
  const [isSubmittingType, setIsSubmittingType] = useState('');
  const [order, setOrder] = useState(foundOrder);
  const menuExpired = useMenuExpired({menuId});
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

  const dispatchCreateOrder = ({menuId, type, menuOptions}) => {
    dispatch(
      createOrder(
        {
          menuId,
          userId: id,
          type,
          menuOptions,
        },
        () => {
          setIsSubmittingType('');
          sendSuccessMessage();
        },
      ),
    );
  };

  const dispatchUpdateOrder = ({type, menuOptions}) => {
    dispatch(
      updateOrder(
        {
          orderId: order.id,
          status: 'active',
          type,
          menuOptions,
        },
        () => {
          setIsSubmittingType('');
          sendSuccessMessage();
        },
      ),
    );
  };

  const handleSubmit = ({menuId, type, menuOptions}) => {
    if (!isSubmittingType) {
      setIsSubmittingType(type);
      if (!order) {
        dispatchCreateOrder({menuId, type, menuOptions});
      } else {
        dispatchUpdateOrder({type, menuOptions});
      }
    }
  };

  const cancelOrder = () => {
    if (!isSubmittingType) {
      setIsSubmittingType('cancel');
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
            setIsSubmittingType('');
          },
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

  const isButtonDisabled = type =>
    menuExpired || (isSubmittingType && isSubmittingType !== type);

  const isButtonLoading = type => isSubmittingType === type;

  const activeOrderOptions = () => {
    return (
      <>
        <ActionButton
          text="cancel order"
          style={[
            order.type === 'takeaway' ? styles.leftButton : {flex: 1},
            styles.cancelButton(isButtonDisabled),
          ]}
          onPress={cancelOrder}
          disabled={isButtonDisabled('cancel')}
          loading={isButtonLoading('cancel')}
          dark={true}
        />
        {order.type === 'takeaway' ? (
          <ActionButton
            text="update order"
            style={styles.rightButton}
            onPress={() => handleTakeaway(menuId, order)}
            disabled={isButtonDisabled('takeaway')}
            loading={isButtonLoading('takeaway')}
            dark={true}
          />
        ) : null}
      </>
    );
  };

  const inactiveOrderOptions = () => {
    return (
      <>
        {!hasOnlyTakeaway ? (
          <ActionButton
            text="Restaurant"
            style={styles.leftButton}
            onPress={() => handleSubmit({menuId, type: 'restaurant'})}
            disabled={isButtonDisabled('restaurant')}
            loading={isButtonLoading('restaurant')}
            dark={true}
          />
        ) : null}
        {!hasOnlyRestaurant ? (
          <ActionButton
            text="Takeaway"
            style={styles.rightButton}
            onPress={() => handleTakeaway(menuId, order)}
            disabled={isButtonDisabled('takeaway')}
            loading={isButtonLoading('takeaway')}
            dark={true}
          />
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.buttons}>
      {order.status === 'active'
        ? activeOrderOptions()
        : inactiveOrderOptions(order.id)}
    </View>
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
  cancelButton: isButtonDisabled => ({
    backgroundColor: isButtonDisabled('cancel') ? '#A5263055' : '#A52630',
  }),
});

export default MenuDetailsButtons;

import React, {useEffect, useRef, useState} from 'react';
import {createOrderValidationSchema} from '../../assets/bodyValidation/orderValidation';
import {createOrder, updateOrder} from '../../redux/thunks/orderThunks';
import {Headline, RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {
  Text,
  View,
  Animated,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AnimatedHeader from '../../components/animatedHeader';
import ActionButton from '../../components/actionButton';
import useMenuExpired from '../../hooks/useMenuExpired';

const MenuTakeawayOrderScreen = ({route, navigation}) => {
  const {menuId, order} = route.params;
  const {menusById} = useSelector(state => state.menuReducer);
  const {id} = useSelector(state => state.userReducer);
  const [isCheckingValidation, setCheckingValidation] = useState(false);
  const offset = useRef(new Animated.Value(0)).current;
  const menuExpired = useMenuExpired({menuId});
  const dispatch = useDispatch();

  useEffect(() => {
    if (menuExpired) {
      navigation.reset({
        routes: [
          {
            name: 'MessageScreen',
            params: {
              message: 'Damn.. This order expired :(',
              image: 'clock-alert-outline',
            },
          },
        ],
      });

      setTimeout(() => {
        navigation.reset({
          routes: [
            {
              name: 'HomeScreen',
            },
          ],
        });
      }, 2000);
    }
  }, [menuExpired]);

  const renderCourses = courses =>
    courses.map((course, idx) => {
      if (course.requiredType !== 'restaurant') {
        return (
          <View
            style={styles.courseDetails}
            key={`${menuId}-${course.courseCategory}-${idx}`}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value={idx} color="#4A6572" />
              <Text style={styles.capitalizedText}>{course.description}</Text>
            </View>
          </View>
        );
      }
    });

  const renderCourseTypes = (values, setFieldValue) =>
    menusById[menuId].menu.map((menuCourse, idx) => (
      <View key={`${menuId}-${idx}`}>
        <Headline style={styles.capitalizedText}>
          {menuCourse.courseCategory}
        </Headline>
        <RadioButton.Group
          onValueChange={newValue => {
            setFieldValue(
              `selectedMenu[${menuCourse.courseCategory}]`,
              newValue,
            );
          }}
          value={values.selectedMenu[menuCourse.courseCategory]}>
          {renderCourses(menuCourse.courses)}
        </RadioButton.Group>
      </View>
    ));

  const dispatchCreateOrder = ({menuOptions, actions}) => {
    dispatch(
      createOrder(
        {
          menuId,
          userId: id,
          type: 'takeaway',
          menuOptions,
        },
        () => {
          actions.setSubmitting(false);
          sendSuccessMessage();
        },
      ),
    );
  };

  const dispatchUpdateOrder = ({menuOptions, actions}) => {
    dispatch(
      updateOrder(
        {
          orderId: order.id,
          status: 'active',
          type: 'takeaway',
          menuOptions,
        },
        () => {
          actions.setSubmitting(false);
          sendSuccessMessage();
        },
      ),
    );
  };

  const submitOrder = ({menuOptions, actions}) => {
    if (!order) {
      dispatchCreateOrder({menuOptions, actions});
    } else {
      dispatchUpdateOrder({menuOptions, actions});
    }
  };

  const sendSuccessMessage = () => {
    navigation.push('MessageScreen', {message: 'Order created!'});

    setTimeout(() => {
      navigation.popToTop();
    }, 1500);
  };

  const generateMenuOptions = () => {
    const menuOptions = {};

    menusById[menuId].menu.forEach(menu => {
      if (menu.courses.length === 1) {
        menuOptions[menu.courseCategory] = 0;
      }
    });
    return menuOptions;
  };

  return (
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
      <Formik
        validationSchema={createOrderValidationSchema(
          menusById[menuId].menu.map(c => c.courseCategory),
        )}
        initialValues={{
          selectedMenu:
            order?.status === 'active'
              ? order.menuOptions
              : generateMenuOptions(),
        }}
        validateOnBlur={isCheckingValidation}
        validateOnChange={isCheckingValidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          submitOrder({menuOptions: values.selectedMenu, actions});
        }}>
        {({values, handleSubmit, errors, setFieldValue, isSubmitting}) => (
          <>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: offset}}}],
                {useNativeDriver: false},
              )}>
              <View
                style={{
                  flexGrow: 1,
                }}>
                <View>{renderCourseTypes(values, setFieldValue)}</View>
              </View>
              {Object.keys(errors).length > 0 ? (
                <Text style={styles.errorMessage}>
                  Please select one dish from each course
                </Text>
              ) : null}
              <ActionButton
                text="Submit Order"
                disabled={menuExpired}
                loading={isSubmitting}
                onPress={() => {
                  if (!isSubmitting) {
                    handleSubmit();
                    setCheckingValidation(true);
                  }
                }}
                theme={{colors: {primary: 'white'}}}
                mode="dark"
              />
            </ScrollView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  body: {},
  scrollViewContainer: {
    paddingTop: 220,
    flexGrow: 1,
    padding: 15,
  },
  courseDetails: {
    flexDirection: 'row',
  },
  errorMessage: {
    fontSize: 12,
    color: '#A52630',
    marginVertical: 10,
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
});

export default MenuTakeawayOrderScreen;

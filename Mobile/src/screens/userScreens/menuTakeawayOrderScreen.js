import React, {useRef, useState} from 'react';
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

const MenuTakeawayOrderScreen = ({route, navigation}) => {
  const {menuId, order} = route.params;
  const {menusById} = useSelector(state => state.menuReducer);
  const {id} = useSelector(state => state.userReducer);
  const [isCheckingValidation, setCheckingValidation] = useState(false);
  const offset = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

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

  const submitOrder = menuOptions => {
    if (!order) {
      dispatch(
        createOrder(
          {
            menuId,
            userId: id,
            type: 'takeaway',
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
            type: 'takeaway',
            menuOptions,
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
    <SafeAreaView style={styles.container}>
      <AnimatedHeader
        animatedValue={offset}
        title={menusById[menuId].restaurantId.name}
      />
      <Formik
        validationSchema={createOrderValidationSchema(
          menusById[menuId].menu.map(c => c.courseCategory),
        )}
        initialValues={{
          selectedMenu: order?.status === 'active' ? order.menuOptions : {},
        }}
        validateOnBlur={isCheckingValidation}
        validateOnChange={isCheckingValidation}
        onSubmit={values => {
          submitOrder(values.selectedMenu);
        }}>
        {({values, handleSubmit, errors, setFieldValue}) => (
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
                onPress={() => {
                  handleSubmit();
                  setCheckingValidation(true);
                }}
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

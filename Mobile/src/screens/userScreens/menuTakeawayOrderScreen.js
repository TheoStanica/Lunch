import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  Animated,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AnimatedHeader from '../../components/animatedHeader';
import {Formik} from 'formik';
import {Headline, RadioButton} from 'react-native-paper';
import ActionButton from '../../components/actionButton';
import {createOrder, updateOrder} from '../../redux/thunks/orderThunks';

const MenuTakeawayOrderScreen = ({route, navigation}) => {
  const {menuId, order} = route.params;
  const {menusById} = useSelector(state => state.menuReducer);
  const {id} = useSelector(state => state.userReducer);
  const offset = useRef(new Animated.Value(0)).current;
  const [errors, setErrors] = useState('');
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

  const validateOptions = menuOptions => {
    const courseCategories = menusById[menuId].menu.map(
      category => category.courseCategory,
    );
    return courseCategories.some(
      courseCategory => !menuOptions.hasOwnProperty(courseCategory),
    );
  };

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
        initialValues={{
          selectedMenu: order?.status === 'active' ? order.menuOptions : {},
        }}
        onSubmit={values => {
          if (validateOptions(values.selectedMenu)) {
            setErrors(
              'Please select one dish from each course to submit your order',
            );
          } else {
            setErrors('');
            submitOrder(values.selectedMenu);
          }
        }}>
        {({values, handleSubmit, setFieldValue}) => (
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
              {errors ? (
                <Text style={styles.errorMessage}>{errors}</Text>
              ) : null}
              <ActionButton text="Submit Order" onPress={handleSubmit} />
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
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
});

export default MenuTakeawayOrderScreen;

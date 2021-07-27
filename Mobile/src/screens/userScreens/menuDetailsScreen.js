import React, {useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {Title, Headline, Paragraph} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from '../../components/actionButton';
import AnimatedHeader from '../../components/animatedHeader';
import {createOrder} from '../../redux/thunks/orderThunks';

const MenuDetailsScreen = ({navigation, route}) => {
  const {menuId} = route.params;
  const {menusById} = useSelector(state => state.menuReducer);
  const {id} = useSelector(state => state.userReducer);
  const offset = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const renderCourses = courses =>
    courses.map((course, idx) => (
      <View
        style={styles.courseDetails}
        key={`${menuId}-${course.courseCategory}-${idx}`}>
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
        {renderCourses(menuCourse.courses)}
      </View>
    ));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AnimatedHeader
          animatedValue={offset}
          title={menusById[menuId].restaurantId.name}
        />
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
            <View style={styles.buttons}>
              <ActionButton
                text="Restaurant"
                style={styles.leftButton}
                onPress={() => {
                  dispatch(
                    createOrder(
                      {
                        menuId: menuId,
                        userId: id,
                        type: 'restaurant',
                        menuOptions: undefined,
                      },
                      () =>
                        navigation.reset({
                          routes: [
                            {name: 'HomeScreen'},
                            {
                              name: 'MessageScreen',
                              params: {message: 'Order created!'},
                            },
                          ],
                        }),
                    ),
                  );
                }}
              />
              <ActionButton
                text="Takeaway"
                style={styles.rightButton}
                onPress={() =>
                  navigation.navigate('MenuTakeawayOrderScreen', {menuId})
                }
              />
            </View>
          </View>
        </ScrollView>
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
});

export default MenuDetailsScreen;

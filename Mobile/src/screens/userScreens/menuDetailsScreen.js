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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import ActionButton from '../../components/actionButton';
import AnimatedHeader from '../../components/animatedHeader';

const MenuDetailsScreen = ({navigation, route}) => {
  const {menuId} = route.params;
  const {menusById} = useSelector(state => state.menuReducer);
  const offset = useRef(new Animated.Value(0)).current;

  const renderCourses = courses => {
    return courses.map((course, idx) => (
      <View
        style={styles.courseDetails}
        key={`${menuId}-${course.courseCategory}-${idx}`}>
        <Paragraph>{course.description}</Paragraph>
        {course.requiredType === 'takeaway' ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon size={24} name="package-variant" color="#4A6572" />
          </View>
        ) : null}
      </View>
    ));
  };

  const renderCourseTypes = () => {
    return menusById[menuId].menu.map((menuCourse, idx) => (
      <View style={styles.courseTypeContainer} key={`${menuId}-${idx}`}>
        <Headline>{menuCourse.courseCategory}</Headline>
        {renderCourses(menuCourse.courses)}
      </View>
    ));
  };

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
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offset}}}],
            {useNativeDriver: false},
          )}>
          <View style={styles.body}>
            {renderCourseTypes()}
            <View style={styles.going}>
              <Title>Going</Title>
              <Icon name="information" size={30} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <ActionButton
            text="Restaurant"
            style={styles.leftButton}
            onPress={() => navigation.navigate('HomeScreen')}
          />
          <ActionButton
            text="Takeaway"
            style={styles.rightButton}
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </View>
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
    margin: 15,
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
    margin: 15,
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
  },
});

export default MenuDetailsScreen;

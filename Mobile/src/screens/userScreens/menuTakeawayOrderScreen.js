import React, {useRef} from 'react';
import {
  Text,
  View,
  Animated,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import AnimatedHeader from '../../components/animatedHeader';
import {Formik} from 'formik';
import {Headline, RadioButton} from 'react-native-paper';
import ActionButton from '../../components/actionButton';

const MenuTakeawayOrderScreen = ({route}) => {
  const {menuId} = route.params;
  const {menusById} = useSelector(state => state.menuReducer);
  const offset = useRef(new Animated.Value(0)).current;
  const [value, setValue] = React.useState(0);

  const renderCourses = courses => {
    return courses.map((course, idx) => (
      <View
        style={styles.courseDetails}
        key={`${menuId}-${course.courseCategory}-${idx}`}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton value={idx} color="#4A6572" />
          <Text>{course.description}</Text>
        </View>
      </View>
    ));
  };

  const renderCourseTypes = () =>
    menusById[menuId].menu.map((menuCourse, idx) => (
      <View key={`${menuId}-${idx}`}>
        <Headline>{menuCourse.courseCategory}</Headline>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          {renderCourses(menuCourse.courses)}
        </RadioButton.Group>
      </View>
    ));

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader
        animatedValue={offset}
        title={menusById[menuId].restaurantId.name}
      />

      <Formik
        initialValues={{
          menu: {},
        }}
        onSubmit={values => console.log('submit', values)}>
        {({values, handleChange, errors, handleSubmit}) => (
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
                  justifyContent: 'space-between',
                }}>
                <View>{renderCourseTypes()}</View>
              </View>
            </ScrollView>
            <ActionButton
              style={styles.submitButton}
              text="Submit Order"
              onPress={handleSubmit}
            />
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
    marginLeft: 15,
  },
  submitButton: {
    margin: 15,
    marginTop: 5,
  },
});

export default MenuTakeawayOrderScreen;

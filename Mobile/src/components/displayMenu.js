import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Headline, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DisplayMenu = ({menuId, order}) => {
  const {menusById} = useSelector(state => state.menuReducer);

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
                course.requiredType === 'takeaway' ? 'package-variant' : 'run'
              }
              color="#4A6572"
            />
          </View>
        ) : null}
      </View>
    ));

  return (
    <View>
      {menusById[menuId].menu.map((menuCourse, idx) => (
        <View style={styles.courseTypeContainer} key={`${menuId}-${idx}`}>
          <Headline style={styles.capitalizedText}>
            {menuCourse.courseCategory}
          </Headline>
          {renderCourses({
            courses: menuCourse.courses,
            courseCategory: menuCourse.courseCategory,
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  courseTypeContainer: {
    marginBottom: 20,
  },
  courseDetails: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  icon: {
    marginLeft: 10,
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
});

export default DisplayMenu;

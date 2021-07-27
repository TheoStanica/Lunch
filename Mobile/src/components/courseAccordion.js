import React, {useState} from 'react';
import {StyleSheet, View, Animated, Alert} from 'react-native';
import {List, IconButton, Subheading} from 'react-native-paper';
import TextInputField from './textInputField';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';

const EMPTY_COURSE = {courseCategory: 'New Course', courses: []};

const CourseAccordion = () => {
  const [courses, setCourses] = useState([]);
  console.log(courses);

  const renderActions = idx => {
    return (
      <>
        <RectButton
          style={[styles.swipeableButton, styles.swipeableDelete]}
          onPress={() =>
            Alert.alert(
              'Delete',
              `Are you sure you want to remove this course?`,
              [
                {
                  text: 'Yes',
                  onPress: () =>
                    setCourses(
                      setCourses(courses.filter((c, index) => idx !== index)),
                    ),
                },
                {text: 'No'},
              ],
            )
          }>
          <Animated.Text
            style={[styles.actionText, styles.swipeableDeleteText]}>
            Delete
          </Animated.Text>
        </RectButton>
      </>
    );
  };

  const renderCourses = () => {
    return courses.length > 0
      ? courses.map((item, idx) => (
          <Swipeable
            key={idx}
            renderRightActions={() => renderActions(idx)}
            friction={1.5}>
            <List.Accordion
              title={item.courseCategory}
              onPress={() => console.log('pressed accordion')}>
              <View style={styles.body}>
                <TextInputField
                  label="Course Title"
                  value={item.courseCategory}
                  onChangeText={v =>
                    setCourses(
                      courses.map((c, index) =>
                        idx === index ? {...c, courseCategory: v} : c,
                      ),
                    )
                  }
                  handleChange={() => {}}
                  field={item.courseCategory}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Subheading>Dishes </Subheading>
                  <IconButton
                    icon="plus"
                    onPress={() => console.log('add dish')}
                  />
                </View>
              </View>
            </List.Accordion>
          </Swipeable>
        ))
      : null;
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Subheading>Courses:</Subheading>
        <IconButton
          icon="plus"
          onPress={() => setCourses([...courses, EMPTY_COURSE])}
        />
      </View>
      {renderCourses()}
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 5,
    minHeight: 150,
    backgroundColor: 'pink',
  },
  swipeableButton: {
    justifyContent: 'center',
  },
  swipeableDelete: {
    backgroundColor: 'red',
  },
  swipeableDeleteText: {
    color: 'white',
  },

  actionText: {
    fontSize: 18,
    width: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CourseAccordion;

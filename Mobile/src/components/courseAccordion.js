import React, {useState} from 'react';
import {StyleSheet, View, Animated, Alert, Text} from 'react-native';
import {
  List,
  IconButton,
  Subheading,
  RadioButton,
  Button,
} from 'react-native-paper';
import TextInputField from './textInputField';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {Formik} from 'formik';

const EMPTY_COURSE = {courseCategory: 'New Course', courses: []};
const EMPTY_DISH = {description: 'New Dish'};

const CourseAccordion = () => {
  const renderActions = (idx, setFieldValue, values) => {
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
                    setFieldValue(
                      `createdMenu`,
                      values.createdMenu.filter((menu, index) => index !== idx),
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

  const renderDish = ({
    values,
    course,
    courseIdx,
    handleChange,
    setFieldValue,
  }) => {
    return course.courses.map((dish, idx) => {
      return (
        <View
          key={`dish-${idx}`}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexGrow: 1}}>
            <TextInputField
              label="Dish Description"
              handleChange={handleChange}
              value={values.createdMenu[courseIdx].courses[idx].description}
              field={`createdMenu[${courseIdx}].courses[${idx}].description`}
            />
          </View>

          <IconButton
            icon="delete"
            onPress={() =>
              Alert.alert(
                'Delete',
                `Are you sure you want to remove this dish?`,
                [
                  {
                    text: 'Yes',
                    onPress: () =>
                      setFieldValue(
                        `createdMenu[${courseIdx}].courses`,
                        values.createdMenu[courseIdx].courses.filter(
                          (dish, dishIdx) => idx !== dishIdx,
                        ),
                      ),
                  },
                  {text: 'No'},
                ],
              )
            }
          />
        </View>
      );
    });
  };

  const renderCourses = () => {
    return (
      <Formik
        initialValues={{
          createdMenu: [],
        }}
        onSubmit={values => console.log(values)}>
        {({
          values,
          handleChange,
          errors,
          isValid,
          handleSubmit,
          setFieldValue,
        }) => (
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
                onPress={() =>
                  setFieldValue('createdMenu', [
                    ...values.createdMenu,
                    EMPTY_COURSE,
                  ])
                }
              />
            </View>
            {values.createdMenu.length > 0
              ? values.createdMenu.map((item, idx) => (
                  <Swipeable
                    key={idx}
                    renderRightActions={() =>
                      renderActions(idx, setFieldValue, values)
                    }
                    friction={1.5}>
                    <List.Accordion title={item.courseCategory}>
                      <View style={styles.body}>
                        <TextInputField
                          label="Course Title"
                          value={values.createdMenu[idx].courseCategory}
                          handleChange={handleChange}
                          field={`createdMenu[${idx}].courseCategory`}
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
                            onPress={() => {
                              let newCourses = values.createdMenu;
                              newCourses[idx] = {
                                ...newCourses[idx],
                                courses: [
                                  ...newCourses[idx].courses,
                                  EMPTY_DISH,
                                ],
                              };
                              setFieldValue('createdMenu', newCourses);
                            }}
                          />
                        </View>
                        {renderDish({
                          course: item,
                          courseIdx: idx,
                          values,
                          handleChange,
                          setFieldValue,
                        })}
                      </View>
                    </List.Accordion>
                  </Swipeable>
                ))
              : null}
            <Button onPress={handleSubmit}>Submit</Button>
          </>
        )}
      </Formik>
    );
  };

  return <>{renderCourses()}</>;
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

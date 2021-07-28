import React from 'react';
import {StyleSheet, View, Animated, Alert, ScrollView} from 'react-native';
import {List, IconButton, Subheading} from 'react-native-paper';
import TextInputField from './textInputField';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import ActionButton from './actionButton';

const EMPTY_COURSE = {courseCategory: '', courses: []};
const EMPTY_DISH = {description: ''};

const CourseAccordion = ({onSubmit}) => {
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
          <View style={styles.flexGrowContainer}>
            <TextInputField
              label="Dish Name"
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

  return (
    <Formik
      initialValues={{
        createdMenu: [],
      }}
      onSubmit={values => onSubmit(values)}>
      {({values, handleChange, errors, handleSubmit, setFieldValue}) => (
        <>
          <View style={styles.coursesHeaderContainer}>
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
          <View style={styles.contentContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {values.createdMenu.length > 0 ? (
                values.createdMenu.map((item, idx) => (
                  <Swipeable
                    key={idx}
                    renderRightActions={() =>
                      renderActions(idx, setFieldValue, values)
                    }
                    friction={1.5}>
                    <List.Accordion
                      style={styles.accordionItem}
                      titleStyle={styles.accordionItemTitle}
                      theme={{colors: {primary: 'white', text: 'white'}}}
                      title={
                        item.courseCategory ? item.courseCategory : 'New Course'
                      }>
                      <View style={styles.body}>
                        <TextInputField
                          label="Course Title"
                          value={values.createdMenu[idx].courseCategory}
                          handleChange={handleChange}
                          field={`createdMenu[${idx}].courseCategory`}
                        />
                        <View style={styles.dishesContainer}>
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
              ) : (
                <View style={styles.alignCenter}>
                  <Subheading>Add a course to create the menu</Subheading>
                </View>
              )}
            </ScrollView>
          </View>
          <ActionButton
            style={styles.button}
            text="create menu"
            onPress={handleSubmit}>
            Submit
          </ActionButton>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#fffa',
  },
  accordionItem: {
    backgroundColor: '#4A6572',
  },
  accordionItemTitle: {
    color: 'white',
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
  coursesHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  dishesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  flexGrowContainer: {
    flexGrow: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  button: {
    marginBottom: 15,
  },
});

export default CourseAccordion;

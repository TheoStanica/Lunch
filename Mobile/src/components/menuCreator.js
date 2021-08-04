import React, {useState} from 'react';
import {StyleSheet, View, Animated, Alert} from 'react-native';
import {
  List,
  IconButton,
  Title,
  Subheading,
  RadioButton,
  Text,
  Divider,
} from 'react-native-paper';
import TextInputField from './textInputField';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import ActionButton from './actionButton';
import {menuValidationSchema} from '../assets/bodyValidation/menuValidation';

const EMPTY_COURSE = {courseCategory: '', courses: []};
const EMPTY_DISH = {description: ''};

const MenuCreator = ({onSubmit}) => {
  const [menuError, setMenuError] = useState('');

  const renderActions = (idx, setFieldValue, values) => {
    return (
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
        <Animated.Text style={[styles.actionText, styles.swipeableDeleteText]}>
          Delete
        </Animated.Text>
      </RectButton>
    );
  };

  const renderDish = ({
    values,
    course,
    courseIdx,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    errors,
  }) => {
    return course.courses.map((dish, idx) => {
      return (
        <View key={`dish-${idx}`}>
          <Divider style={styles.divider} />
          <View style={styles.dishContainer}>
            <View style={styles.flexGrowContainer}>
              <TextInputField
                label="Dish Name"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={
                  touched?.createdMenu?.[courseIdx]?.courses?.[idx]?.description
                }
                value={
                  values.createdMenu?.[courseIdx]?.courses?.[idx]?.description
                }
                errors={
                  errors?.createdMenu?.[courseIdx]?.courses?.[idx]?.description
                }
                field={`createdMenu[${courseIdx}].courses[${idx}].description`}
                theme={{colors: {primary: '#4A6572'}}}
                underlineColor="#0002"
                style={styles.dishInputField}
              />
              <RadioButton.Group
                value={values.createdMenu[courseIdx].courses[idx].requiredType}
                onValueChange={newValue => {
                  if (
                    values.createdMenu[courseIdx].courses[idx].requiredType ===
                    newValue
                  ) {
                    setFieldValue(
                      `createdMenu[${courseIdx}].courses[${idx}].requiredType`,
                      undefined,
                    );
                  } else {
                    setFieldValue(
                      `createdMenu[${courseIdx}].courses[${idx}].requiredType`,
                      newValue,
                    );
                  }
                }}>
                <Text style={styles.radioText}>Only: </Text>
                <View style={styles.radioGroupContainer}>
                  <View style={styles.radioContainer}>
                    <RadioButton value="restaurant" color="#4A6572" />
                    <Text>Restaurant</Text>
                  </View>
                  <View style={styles.radioContainer}>
                    <RadioButton value="takeaway" color="#4A6572" />
                    <Text>Takeaway</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>

            <IconButton
              icon="delete"
              color="red"
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
        </View>
      );
    });
  };

  const checkForErrors = errors => {
    if (menuError && Object.keys(errors).length > 0) {
      setMenuError('Please fill in the menu correctly');
    } else setMenuError('');
  };

  return (
    <Formik
      validationSchema={menuValidationSchema}
      initialValues={{
        createdMenu: [],
      }}
      onSubmit={values => onSubmit(values.createdMenu)}>
      {({
        values,
        handleChange,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <View style={styles.spaceBetweenContainer}>
          <View>
            <View style={styles.coursesHeaderContainer}>
              <Title>Menu:</Title>
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
            {checkForErrors(errors)}
            {typeof errors.createdMenu === 'string' || menuError ? (
              <Text style={styles.errorMessage}>
                {menuError ? menuError : errors.createdMenu}
              </Text>
            ) : null}
            <View style={styles.contentContainer}>
              {values.createdMenu.length > 0 ? (
                values.createdMenu.map((item, idx) => (
                  <Swipeable
                    key={idx}
                    renderRightActions={() =>
                      renderActions(idx, setFieldValue, values)
                    }
                    containerStyle={{marginBottom: 5}}
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
                          handleBlur={handleBlur}
                          touched={touched?.createdMenu?.[idx]?.courseCategory}
                          errors={errors?.createdMenu?.[idx]?.courseCategory}
                          field={`createdMenu[${idx}].courseCategory`}
                          style={styles.dishInputField}
                          underlineColor="transparent"
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
                        {menuError &&
                        typeof errors?.createdMenu?.[idx]?.courses ===
                          'string' ? (
                          <Text style={[styles.errorMessage, {marginLeft: 12}]}>
                            {errors.createdMenu[idx].courses}
                          </Text>
                        ) : null}
                        {renderDish({
                          course: item,
                          courseIdx: idx,
                          values,
                          errors,
                          touched,
                          handleBlur,
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
            </View>
          </View>
          <View>
            <ActionButton
              style={styles.button}
              text="create menu"
              onPress={() => {
                if (Object.keys(errors).length > 0) {
                  setMenuError('Please fill in the menu correctly');
                } else setMenuError('');
                handleSubmit();
              }}>
              Submit
            </ActionButton>
          </View>
        </View>
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
    backgroundColor: '#fff7e0',
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
    marginLeft: 12,
  },
  flexGrowContainer: {
    flexGrow: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  spaceBetweenContainer: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  divider: {
    backgroundColor: '#4A6572',
    borderWidth: 1,
  },
  dishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  radioGroupContainer: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  radioText: {
    marginLeft: 12,
  },
  dishInputField: {
    backgroundColor: 'transparent',
    borderWidth: 0.3,
    borderColor: '#0007',
    fontSize: 12,
  },
  inputField: {
    backgroundColor: 'transparent',
    fontSize: 12,
    height: 45,
  },
  errorMessage: {
    fontSize: 12,
    color: '#A52630',
    marginBottom: 10,
  },
});

export default MenuCreator;

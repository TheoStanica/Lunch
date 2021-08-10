import React, {useState} from 'react';
import {StyleSheet, View, Animated, Alert} from 'react-native';
import {List, IconButton, Title, Subheading} from 'react-native-paper';
import {RectButton} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import {menuValidationSchema} from '../assets/bodyValidation/menuValidation';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ActionButton from './actionButton';
import MenuCreatorInputField from './menuCreatorInputField';
import MenuCreatorDish from './menuCreatorDish';
import MenuCreatorTopError from './menuCreatorTopError';
import MenuCreatorTopDishError from './menuCreatorTopDishError';

const EMPTY_COURSE = {courseCategory: '', courses: []};
const EMPTY_DISH = {description: '', requiredType: 'both'};

const MenuCreator = ({onSubmit}) => {
  const [shouldDisplayTopErrors, setShouldDisplayTopErrors] = useState(false);

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

  return (
    <View onStartShouldSetResponder={() => true} style={{flexGrow: 1}}>
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
              <MenuCreatorTopError
                errors={errors}
                visible={shouldDisplayTopErrors}
              />

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
                          item.courseCategory
                            ? item.courseCategory
                            : 'New Course'
                        }>
                        <View style={styles.body}>
                          <MenuCreatorInputField
                            placeholder="Course Title"
                            value={values.createdMenu[idx].courseCategory}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={
                              touched?.createdMenu?.[idx]?.courseCategory
                            }
                            errors={errors?.createdMenu?.[idx]?.courseCategory}
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
                          <MenuCreatorTopDishError
                            errors={errors}
                            visible={shouldDisplayTopErrors}
                            idx={idx}
                          />
                          <MenuCreatorDish
                            course={item}
                            courseIdx={idx}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                          />
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
                  setShouldDisplayTopErrors(true);
                  handleSubmit();
                }}>
                Submit
              </ActionButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
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
    backgroundColor: '#A52630',
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
  alignCenter: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 15,
  },
  spaceBetweenContainer: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
});

export default MenuCreator;

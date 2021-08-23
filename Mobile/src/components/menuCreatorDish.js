import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import MenuCreatorInputField from './menuCreatorInputField';
import MenuCreatorChip from './menuCreatorChip';

const MenuCreatorDish = ({
  values,
  course,
  courseIdx,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  errors,
}) => {
  const removeDish = idx => {
    setFieldValue(
      `createdMenu[${courseIdx}].courses`,
      values.createdMenu[courseIdx].courses.filter(
        (dish, dishIdx) => idx !== dishIdx,
      ),
    );
  };

  return course.courses.map((dish, idx) => {
    return (
      <View key={`dish-${idx}`}>
        <Divider style={styles.divider} />
        <View style={styles.dishContainer}>
          <View style={styles.flexGrowContainer}>
            <MenuCreatorInputField
              placeholder="Dish Name"
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
            />

            <View style={styles.radioGroupContainer}>
              <View style={styles.wrapContainer}>
                <Text style={styles.radioText}>Type</Text>
                <MenuCreatorChip
                  values={values}
                  courseIdx={courseIdx}
                  idx={idx}
                  setFieldValue={setFieldValue}
                  field="both"
                  defaultField="both"
                  text="All"
                />
                <MenuCreatorChip
                  values={values}
                  courseIdx={courseIdx}
                  idx={idx}
                  setFieldValue={setFieldValue}
                  field="restaurant"
                  defaultField="both"
                  text="Restaurant"
                />
                <MenuCreatorChip
                  values={values}
                  courseIdx={courseIdx}
                  idx={idx}
                  setFieldValue={setFieldValue}
                  field="takeaway"
                  defaultField="both"
                  text="Office"
                />
              </View>
            </View>
          </View>

          <IconButton
            icon="delete"
            color="#A52630"
            onPress={() =>
              Alert.alert(
                'Delete',
                `Are you sure you want to remove this dish?`,
                [
                  {
                    text: 'Yes',
                    onPress: () => removeDish(idx),
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

const styles = StyleSheet.create({
  dishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  divider: {
    backgroundColor: '#4A6572',
    borderWidth: 0.3,
  },
  flexGrowContainer: {
    flexGrow: 1,
  },
  radioGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  wrapContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});

export default MenuCreatorDish;

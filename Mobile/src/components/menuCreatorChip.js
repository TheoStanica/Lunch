import React from 'react';
import {Chip} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const MenuCreatorChip = ({
  values,
  courseIdx,
  idx,
  field,
  defaultField,
  text,
  setFieldValue,
}) => {
  const isChipSelected = () =>
    values.createdMenu[courseIdx].courses[idx].requiredType === field
      ? true
      : false;

  const updateChipValue = () => {
    if (values.createdMenu[courseIdx].courses[idx].requiredType === field) {
      setFieldValue(
        `createdMenu[${courseIdx}].courses[${idx}].requiredType`,
        defaultField,
      );
    } else {
      setFieldValue(
        `createdMenu[${courseIdx}].courses[${idx}].requiredType`,
        field,
      );
    }
  };

  return (
    <Chip
      style={styles.chip}
      selected={isChipSelected()}
      onPress={updateChipValue}>
      {text}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    marginLeft: 5,
    marginTop: 5,
  },
});

export default MenuCreatorChip;

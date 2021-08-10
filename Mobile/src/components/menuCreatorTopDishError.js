import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';

const MenuCreatorTopDishError = ({errors, visible, idx}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && typeof errors?.createdMenu?.[idx]?.courses === 'string') {
      setError(errors.createdMenu[idx].courses);
    }
  }, [errors]);

  return error && typeof errors?.createdMenu?.[idx]?.courses === 'string' ? (
    <Text style={styles.errorMessage}>{error}</Text>
  ) : null;
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 12,
    color: '#A52630',
    marginBottom: 10,
    marginLeft: 12,
  },
});

export default MenuCreatorTopDishError;

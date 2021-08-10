import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';

const MenuCreatorTopError = ({errors, visible}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible) {
      if (typeof errors.createdMenu === 'string') {
        setError(errors.createdMenu);
      } else if (Object.keys(errors).length > 0) {
        setError('Please fill in the menu correctly');
      }
    }
  }, [errors]);

  return error && Object.keys(errors).length > 0 ? (
    <Text style={styles.errorMessage}>{error}</Text>
  ) : null;
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 12,
    color: '#A52630',
    marginBottom: 10,
  },
});

export default MenuCreatorTopError;

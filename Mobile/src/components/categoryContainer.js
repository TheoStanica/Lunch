import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';

const CategoryContainer = ({title, children}) => {
  return (
    <View style={styles.container}>
      {title ? <Title style={styles.title}>{title}</Title> : null}
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff7e0',
    borderRadius: 15,
    marginBottom: 20,
    paddingVertical: 15,
  },
  title: {
    marginLeft: 15,
    fontSize: 22,
  },
});

export default CategoryContainer;

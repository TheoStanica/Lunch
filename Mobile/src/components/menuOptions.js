import React from 'react';
import {StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';

const MenuOptions = ({menuOptions}) => {
  return (
    <FlatList
      data={menuOptions}
      keyExtractor={menu => menu.courseCategory}
      renderItem={menu => (
        <SafeAreaView style={styles.container}>
          <Text style={styles.courseCategory}>{menu.item.courseCategory}</Text>
          <FlatList
            data={menu.item.courses}
            keyExtractor={course => course.description}
            renderItem={course => (
              <SafeAreaView>
                <Text style={styles.course}>
                  {course.item.description}: {course.item.count}
                </Text>
              </SafeAreaView>
            )}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  course: {
    fontSize: 16,
    marginHorizontal: 20,
    textTransform: 'capitalize',
  },
  courseCategory: {
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 5,
    textTransform: 'capitalize',
  },
});

export default MenuOptions;

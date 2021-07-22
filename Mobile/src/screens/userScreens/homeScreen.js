import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {getUser} from '../../redux/thunks/userThunks';
import MenuCard from '../../components/menuCard';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <MenuCard
          title="Meniu something"
          onPress={() =>
            navigation.navigate('MenuDetailsScreen', {menuId: '123123'})
          }
        />
        <MenuCard title="Meniu something" />
        <MenuCard title="Meniu something" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginHorizontal: 15,
  },
});

export default HomeScreen;

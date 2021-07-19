import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

import ActionButton from '../../components/actionButton';

const AdminScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ActionButton
          text="Manage users"
          onPress={() => navigation.navigate('ManageUsersScreen')}
        />
        <ActionButton
          text="Manage restaurants"
          onPress={() => navigation.navigate('ManageRestaurantsScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 25,
  },
});

export default AdminScreen;

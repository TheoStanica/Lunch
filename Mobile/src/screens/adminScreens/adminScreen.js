import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import ActionButton from '../../components/actionButton';

const AdminScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Admin Panel</Text>
        <ActionButton
          style={styles.button}
          text="Manage users"
          onPress={() => navigation.navigate('ManageUsersScreen')}
        />
        <ActionButton
          style={styles.button}
          text="Manage restaurants"
          onPress={() => navigation.navigate('ManageRestaurantsScreen')}
        />
        <ActionButton
          style={styles.button}
          text="Manage Menus"
          onPress={() => navigation.navigate('ManageMenusScreen')}
        />
        <ActionButton
          style={styles.button}
          text="Orders Statistics"
          onPress={() => navigation.navigate('OrdersStack')}
        />
        <ActionButton
          style={styles.button}
          text="Reports"
          onPress={() => navigation.navigate('PdfStack')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  body: {
    marginHorizontal: 15,
  },
  button: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
  },
});

export default AdminScreen;

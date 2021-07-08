import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';

const AuthScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Auth</Text>
      <Button onPress={() => navigation.navigate('LoginScreen')}>Login</Button>
      <Button onPress={() => navigation.navigate('RegisterScreen')}>
        Register
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthScreen;

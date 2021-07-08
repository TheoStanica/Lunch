import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const AuthScreen = ({navigation}) => {
  return (
    <View style={styles.text}>
      <Text>Auth</Text>
      <Button onPress={() => navigation.navigate('LoginScreen')}>Login</Button>
      <Button onPress={() => navigation.navigate('RegisterScreen')}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default AuthScreen;

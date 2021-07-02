import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/thunks/userThunks';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log('handling things');
    if (!email) {
      alert('Email is required');
      return;
    }
    if (!password) {
      alert('Password is required');
      return;
    }
    dispatch(loginUser({email, password}));
  };

  return (
    <View style={styles.text}>
      <Text>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Button mode="outlined" onPress={() => handleLogin()}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default LoginScreen;

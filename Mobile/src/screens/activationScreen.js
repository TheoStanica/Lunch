import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import useMessages from '../hooks/useMessages';
import {activateAccountUser} from '../redux/thunks/userThunks';

const ActivationScreen = ({route, navigation}) => {
  const message = useMessages();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      activateAccountUser({activationToken: route.params?._activationToken}),
    );
  }, []);

  useEffect(() => {
    if (message) {
      navigation.reset({
        routes: [
          {name: 'AuthScreen'},
          {
            name: 'MessageScreen',
            params: {message},
          },
        ],
      });
    }
  }, [message]);

  return (
    <View style={styles.container}>
      {Platform.OS !== 'ios' ? <StatusBar backgroundColor="#FBBC00" /> : null}
      <Text style={styles.text}>Activating your account..</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBBC00',
  },
  text: {
    fontSize: 25,
  },
});

export default ActivationScreen;

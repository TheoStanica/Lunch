import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import ActionButton from '../../components/actionButton';

const CreateThreadScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Create Thread Screen</Text>
      <ActionButton text="Create" onPress={() => handleSubmit()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
});

export default CreateThreadScreen;

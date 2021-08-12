import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

const CreatePdfScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Create Pdf Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
});

export default CreatePdfScreen;

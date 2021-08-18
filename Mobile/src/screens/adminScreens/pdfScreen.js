import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';

const PdfScreen = ({route}) => {
  const source = {uri: `file://${route.params.path}`};

  return (
    <View style={styles.container}>
      <Pdf source={source} style={styles.pdf} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default PdfScreen;

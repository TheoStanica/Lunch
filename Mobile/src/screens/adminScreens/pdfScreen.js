import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PdfScreen = ({route, navigation}) => {
  const source = {uri: `file://${route.params.path}`};
  const handleSharePdf = async () => {
    try {
      await Share.open({
        title: 'This is my report ',
        message: 'Message:',
        url: `file://${route.params.path}`,
        subject: 'Report',
      });
    } catch (error) {}
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="share-variant"
          size={30}
          color="black"
          style={{marginRight: 10}}
          onPress={() => handleSharePdf()}
        />
      ),
    });
  }, []);

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
    height: Dimensions.get('window').height,
  },
});

export default PdfScreen;

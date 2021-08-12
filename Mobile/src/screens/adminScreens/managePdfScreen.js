import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {handleError} from '../../redux/thunks/errorThunks';
import {FAB} from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const CreatePdfScreen = () => {
  const [filePath, setFilePath] = useState('');
  const dispatch = useDispatch();

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        dispatch(handleError(error));
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async ({fileName}) => {
    if (await isPermitted()) {
      const options = {
        html: '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
        fileName: fileName,
        directory: 'documents',
      };

      try {
        const file = await RNHTMLtoPDF.convert(options);
        const RNFS = require('react-native-fs');
        const path = RNFS.DocumentDirectoryPath + '/statistics';

        if (!(await RNFS.exists(path))) await RNFS.mkdir(path);
        await RNFS.moveFile(file.filePath, path + '/' + fileName + '.pdf');

        const result = await RNFS.readDir(path);

        console.log(result);

        setFilePath(file.filePath);
      } catch (error) {
        dispatch(handleError(error));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        animated={true}
        onPress={() => createPDF({fileName: 'statistics'})}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  fab: {
    position: 'absolute',
    margin: 40,
    right: 0,
    bottom: 0,
  },
});

export default CreatePdfScreen;

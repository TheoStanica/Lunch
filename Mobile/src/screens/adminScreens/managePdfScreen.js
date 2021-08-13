import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {handleError} from '../../redux/thunks/errorThunks';
import {FAB} from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import AdminField from '../../components/adminField';
import HideKeyboard from '../../components/hideKeyboard';
import Moment from 'moment';

const CreatePdfScreen = () => {
  const [filePath, setFilePath] = useState('');
  const [PDFs, setPDFs] = useState([]);
  const [row, setRow] = useState([]);
  const [previousOpenedRow, setPreviousOpenedRow] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPdfs = async () => {
      const RNFS = require('react-native-fs');
      const result = await RNFS.readDir(
        RNFS.DocumentDirectoryPath + '/statistics',
      );
      setPDFs(result);
    };

    getPdfs();
  }, []);

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

        setPDFs(await RNFS.readDir(path));
      } catch (error) {
        dispatch(handleError(error));
      }
    }
  };

  const deletePdf = async ({filePath}) => {
    if (await isPermitted()) {
      try {
        const RNFS = require('react-native-fs');
        const path = RNFS.DocumentDirectoryPath + '/statistics';

        await RNFS.unlink(filePath);
        setPDFs(await RNFS.readDir(path));
      } catch (error) {
        dispatch(handleError(error));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HideKeyboard>
        <FlatList
          data={PDFs}
          keyExtractor={pdf => pdf.name}
          renderItem={pdf => (
            <AdminField
              index={pdf.index}
              title={pdf.item.name}
              description={`Created: ${Moment(pdf.item.mtime).format(
                'DD-MM-YYYY',
              )}`}
              icon="pdf-box"
              onDelete={() => deletePdf({filePath: pdf.item.path})}
              onPress={() => console.log('pressed')}
              row={row}
              onUpdateRow={row => setRow(row)}
              prevOpenedRow={previousOpenedRow}
              onUpdatePrevOpenedRow={prevRow => setPreviousOpenedRow(prevRow)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </HideKeyboard>
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        animated={true}
        onPress={() => createPDF({fileName: 'statistics5'})}
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

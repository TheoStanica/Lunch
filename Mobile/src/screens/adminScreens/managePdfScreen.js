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
import Moment from 'moment';

const CreatePdfScreen = () => {
  const RNFS = require('react-native-fs');
  const docDirPath = RNFS.DocumentDirectoryPath + '/statistics';
  const [PDFs, setPDFs] = useState([]);
  const [row, setRow] = useState([]);
  const [previousOpenedRow, setPreviousOpenedRow] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPdfs = async () => {
      setPDFs(await RNFS.readDir(docDirPath));
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

        if (!(await RNFS.exists(docDirPath))) await RNFS.mkdir(docDirPath);
        await RNFS.moveFile(
          file.filePath,
          docDirPath + '/' + fileName + '.pdf',
        );

        setPDFs(await RNFS.readDir(docDirPath));
      } catch (error) {
        dispatch(handleError(error));
      }
    }
  };

  const deletePdf = async ({filePath}) => {
    if (await isPermitted()) {
      try {
        await RNFS.unlink(filePath);
        setPDFs(await RNFS.readDir(docDirPath));
      } catch (error) {
        dispatch(handleError(error));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
            onPress={() => console.log(pdf)}
            row={row}
            onUpdateRow={row => setRow(row)}
            prevOpenedRow={previousOpenedRow}
            onUpdatePrevOpenedRow={prevRow => setPreviousOpenedRow(prevRow)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        animated={true}
        onPress={() =>
          createPDF({
            fileName: `Statistics${Moment(Date.now()).format(
              'DD-MM-YYYYThh-mm',
            )}`,
          })
        }
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

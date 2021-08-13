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
import {ActivityIndicator} from 'react-native-paper';
import AdminField from '../../components/adminField';
import Moment from 'moment';

const CreatePdfScreen = () => {
  const RNFS = require('react-native-fs');
  const docDirPath = RNFS.DocumentDirectoryPath + '/statistics';
  const [PDFs, setPDFs] = useState([]);
  const [row, setRow] = useState([]);
  const [previousOpenedRow, setPreviousOpenedRow] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPdfs = async () => {
      setIsFetching(true);
      setPDFs(await RNFS.readDir(docDirPath));
      setIsFetching(false);
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

  const deletePdf = async ({filePath}) => {
    setIsFetching(true);
    if (await isPermitted()) {
      try {
        await RNFS.unlink(filePath);
        setPDFs(await RNFS.readDir(docDirPath));
        setIsFetching(false);
      } catch (error) {
        dispatch(handleError(error));
        setIsFetching(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isFetching ? (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator color="#4A6572" />
        </SafeAreaView>
      ) : null}
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
            icon="file-pdf-outline"
            onDelete={() => deletePdf({filePath: pdf.item.path})}
            onPress={() => console.log('pressed')}
            row={row}
            onUpdateRow={row => setRow(row)}
            prevOpenedRow={previousOpenedRow}
            onUpdatePrevOpenedRow={prevRow => setPreviousOpenedRow(prevRow)}
          />
        )}
        refreshing={isFetching}
        showsVerticalScrollIndicator={false}
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
  loadingContainer: {
    margin: 10,
  },
});

export default CreatePdfScreen;

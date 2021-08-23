import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getUser, logoutUser} from '../../redux/thunks/userThunks';
import ProfileField from '../../components/profileField';
import ActionButton from '../../components/actionButton';
import messaging from '@react-native-firebase/messaging';

const ProfileScreen = ({navigation}) => {
  const userReducer = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (Platform.OS === 'android') {
      try {
        await messaging().deleteToken();
      } catch (error) {}
    }
    dispatch(logoutUser());
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getUser());
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.title}>Welcome back</Text>
          <ProfileField
            paragraph={userReducer.fullname}
            title="Name"
            icon="account-circle-outline"
            iconColor="#4A6572"
          />
          <ProfileField
            paragraph={userReducer.email}
            title="Email"
            icon="email"
            iconColor="#4A6572"
          />
          <ProfileField
            paragraph={`Account ${userReducer.status}`}
            title="Status"
            icon={
              userReducer.status === 'active'
                ? 'chevron-down-circle-outline'
                : 'close-circle-outline'
            }
            iconColor="#4A6572"
          />
        </View>
        <View>
          <ActionButton
            text="Update Profile"
            onPress={() => navigation.navigate('UpdateProfileScreen')}
          />
          <ActionButton
            text="Logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  logoutButton: {
    backgroundColor: '#A52630',
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
  },
});

export default ProfileScreen;

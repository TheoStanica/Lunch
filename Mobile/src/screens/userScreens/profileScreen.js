import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import ProfileField from '../../components/profileField';
import ActionButton from '../../components/actionButton';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/thunks/userThunks';

const ProfileScreen = ({navigation}) => {
  const userReducer = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Title>Welcome</Title>
          <Card style={styles.card}>
            <ProfileField
              title={userReducer.fullname}
              paragraph="Full name"
              icon="account-circle-outline"
            />
            <ProfileField
              title={userReducer.email}
              paragraph="Email"
              icon="email"
            />
            <ProfileField
              title={`Account ${userReducer.status}`}
              paragraph="Status"
              icon={
                userReducer.status === 'active'
                  ? 'chevron-down-circle-outline'
                  : 'close-circle-outline'
              }
            />
          </Card>
          <ActionButton
            text="Update"
            onPress={() => navigation.navigate('UpdateProfileScreen')}
          />
        </View>
        <ActionButton text="Logout" onPress={() => dispatch(logoutUser())} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 25,
    justifyContent: 'space-between',
  },
  glassButton: {marginVertical: 8, shadowColor: 'transparent'},
  buttonText: {
    color: 'green',
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 40,
  },
  card: {
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
});

export default ProfileScreen;

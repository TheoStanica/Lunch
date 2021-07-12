import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import ProfileField from '../components/profileField';

const ProfileScreen = ({navigation}) => {
  const userReducer = useSelector(state => state.userReducer);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Title>Welcome</Title>
        <Card>
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
        <Button
          mode="contained"
          onPress={() => navigation.navigate('UpdateProfileScreen')}
          style={styles.glassButton}
          color="#fff7">
          <Text style={styles.buttonText}>Update</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 25,
    paddingBottom: 100,
  },
  glassButton: {marginVertical: 8, shadowColor: 'transparent'},
  buttonText: {
    color: 'green',
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 40,
  },
});

export default ProfileScreen;

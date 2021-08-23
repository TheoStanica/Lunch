import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {updateUser} from '../../redux/thunks/userThunks';
import {Formik} from 'formik';
import {updateValidationSchema} from '../../assets/bodyValidation/userValidation';
import {useDispatch} from 'react-redux';
import CustomDropDownPicker from '../../components/customDropDownPicker';
import TextInputField from '../../components/textInputField';
import ActionButton from '../../components/actionButton';
import HideKeyboard from '../../components/hideKeyboard';

const UserDetailsScreen = ({route, navigation}) => {
  const {user} = route.params;
  const [roleValue, setRoleValue] = useState(user.role);
  const dispatch = useDispatch();

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <Formik
          validationSchema={updateValidationSchema}
          initialValues={{
            email: user.email,
            fullname: user.fullname,
            role: user.role,
          }}
          onSubmit={values => {
            values.role = roleValue;
            if (values.email === user.email) delete values.email;

            dispatch(
              updateUser(
                {
                  _userId: user.id,
                  email: values.email,
                  fullname: values.fullname,
                  role: values.role,
                },
                () =>
                  navigation.replace('MessageScreen', {
                    message: 'User Updated!',
                  }),
              ),
            );
          }}>
          {({
            values,
            handleChange,
            errors,
            touched,
            handleBlur,
            handleSubmit,
          }) => (
            <View style={styles.contentContainer}>
              <View>
                <TextInputField
                  label="Email"
                  value={values.email}
                  errors={errors.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.email}
                  field="email"
                />
                <CustomDropDownPicker
                  text="Role"
                  textStyle={styles.textStyle}
                  placeholder={{
                    label: roleValue,
                    value: roleValue,
                  }}
                  setSelectedItem={setRoleValue}
                  items={[
                    roleValue === 'admin'
                      ? {label: 'user', value: 'user'}
                      : {label: 'admin', value: 'admin'},
                  ]}
                  containerStyle={{marginTop: 10}}
                />
                <TextInputField
                  label="Full Name"
                  value={values.fullname}
                  errors={errors.fullname}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.fullname}
                  field="fullname"
                />
              </View>
              <ActionButton text="Update" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
    flex: 1,
    backgroundColor: '#FFF1CA',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'gray',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 12,
  },
});

export default UserDetailsScreen;

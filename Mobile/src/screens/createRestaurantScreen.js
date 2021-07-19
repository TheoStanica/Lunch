import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import TextInputField from '../components/textInputField';
import ActionButton from '../components/actionButton';
import {restaurantValidationSchema} from '../assets/bodyValidation/restaurantValidation';
import HideKeyboard from '../components/hideKeyboard';
import {createRestaurant} from '../redux/thunks/restaurantThunks';

const CreateRestaurantScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <Formik
          validationSchema={restaurantValidationSchema}
          initialValues={{
            name: '',
            cost: '',
          }}
          onSubmit={values => {
            console.log('dispatching thunk to create restaurant', values);
            dispatch(
              createRestaurant({name: values.name, cost: values.cost}, () => {
                navigation.replace('MessageScreen', {
                  message: 'Restaurant Created!',
                });
              }),
            );
          }}>
          {({values, handleChange, errors, handleSubmit}) => (
            <View style={styles.contentContainer}>
              <View>
                <TextInputField
                  label="Name"
                  value={values.name}
                  errors={errors.name}
                  handleChange={handleChange}
                  field="name"
                />
                <TextInputField
                  label="Cost"
                  value={values.cost}
                  errors={errors.cost}
                  handleChange={handleChange}
                  field="cost"
                  keyboardType="numeric"
                />
              </View>
              <ActionButton text="Add Restaurant" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CreateRestaurantScreen;

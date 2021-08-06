import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {createRestaurant} from '../../redux/thunks/restaurantThunks';
import {restaurantValidationSchema} from '../../assets/bodyValidation/restaurantValidation';
import TextInputField from '../../components/textInputField';
import ActionButton from '../../components/actionButton';
import HideKeyboard from '../../components/hideKeyboard';
import DateTimePicker from '../../components/timePicker';
import moment from 'moment';

const CreateRestaurantScreen = ({navigation}) => {
  const [notifyAfter, setNotifyAfter] = useState('12:00 PM');
  const [cancelAt, setCancelAt] = useState('2:00 PM');
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
            dispatch(
              createRestaurant(
                {name: values.name, cost: values.cost, notifyAfter, cancelAt},
                () => {
                  navigation.replace('MessageScreen', {
                    message: 'Restaurant Created!',
                  });
                },
              ),
            );
          }}>
          {({
            values,
            handleChange,
            errors,
            touched,
            isValid,
            handleBlur,
            handleSubmit,
          }) => (
            <View style={styles.contentContainer}>
              <View>
                <TextInputField
                  label="Name"
                  value={values.name}
                  errors={errors.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.name}
                  field="name"
                />
                <TextInputField
                  label="Cost"
                  value={values.cost}
                  errors={errors.cost}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.cost}
                  field="cost"
                  keyboardType="numeric"
                />
                <DateTimePicker
                  title="Notify After"
                  description={notifyAfter}
                  mode="time"
                  date={new Date(`01/01/1970 ${notifyAfter}`)}
                  onConfirm={date => setNotifyAfter(moment(date).format('LT'))}
                />
                <DateTimePicker
                  title="Cancel At"
                  description={cancelAt}
                  mode="time"
                  date={new Date(`01/01/1970 ${cancelAt}`)}
                  onConfirm={date => setCancelAt(moment(date).format('LT'))}
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
    padding: 15,
    backgroundColor: '#FFF1CA',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CreateRestaurantScreen;

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {Switch, List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import TextInputField from '../../components/textInputField';
import ActionButton from '../../components/actionButton';
import {restaurantValidationSchema} from '../../assets/bodyValidation/restaurantValidation';
import HideKeyboard from '../../components/hideKeyboard';
import {updateRestaurant} from '../../redux/thunks/restaurantThunks';
import DateTimePicker from '../../components/timePicker';
import moment from 'moment';

const RestaurantDetailsScreen = ({route, navigation}) => {
  const {restaurantId} = route.params;
  const {restaurantsById} = useSelector(state => state.restaurantReducer);
  const [notifyAfter, setNotifyAfter] = useState(
    restaurantsById[restaurantId].notifyAfter,
  );
  const [cancelAt, setCancelAt] = useState(
    restaurantsById[restaurantId].cancelAt,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setNotifyAfter(restaurantsById[restaurantId].notifyAfter);
    setCancelAt(restaurantsById[restaurantId].cancelAt);
  }, [restaurantsById[restaurantId]]);

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <Formik
          validationSchema={restaurantValidationSchema}
          initialValues={{
            name: restaurantsById[restaurantId]?.name,
            cost: `${restaurantsById[restaurantId]?.cost}`,
            status: restaurantsById[restaurantId]?.status,
          }}
          onSubmit={values => {
            const data = {
              id: restaurantId,
              name:
                values.name !== restaurantsById[restaurantId].name
                  ? values.name
                  : undefined,
              cost:
                values.cost !== restaurantsById[restaurantId].cost
                  ? parseInt(values.cost)
                  : undefined,
              status:
                values.status !== restaurantsById[restaurantId].status
                  ? values.status
                  : undefined,
              notifyAfter,
              cancelAt,
            };
            dispatch(
              updateRestaurant(data, () =>
                navigation.replace('MessageScreen', {
                  message: 'Restaurant Updated!',
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
            setFieldValue,
          }) => (
            <View style={styles.contentContainer}>
              <View>
                <TextInputField
                  label="Name"
                  value={values.name}
                  errors={errors.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched}
                  field="name"
                />
                <TextInputField
                  label="Cost"
                  value={values.cost}
                  errors={errors.cost}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched}
                  field="cost"
                  keyboardType="numeric"
                />
                <List.Item
                  title="Active"
                  right={() => (
                    <Switch
                      value={values.status === 'active' ? true : false}
                      color="#4A6572"
                      onValueChange={() =>
                        setFieldValue(
                          'status',
                          values.status === 'active' ? 'inactive' : 'active',
                        )
                      }
                    />
                  )}
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
              <ActionButton text="Update" onPress={handleSubmit} />
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
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RestaurantDetailsScreen;

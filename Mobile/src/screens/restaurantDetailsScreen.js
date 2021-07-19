import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import TextInputField from '../components/textInputField';
import ActionButton from '../components/actionButton';
import {restaurantValidationSchema} from '../assets/bodyValidation/restaurantValidation';
import HideKeyboard from '../components/hideKeyboard';
import {updateRestaurant} from '../redux/thunks/restaurantThunks';

const RestaurantDetailsScreen = ({route, navigation}) => {
  const {restaurantId} = route.params;
  const {restaurantsById} = useSelector(state => state.restaurantReducer);
  const dispatch = useDispatch();

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
                  ? values.cost
                  : undefined,
              status:
                values.status !== restaurantsById[restaurantId].status
                  ? values.status
                  : undefined,
            };
            dispatch(
              updateRestaurant(data, () =>
                navigation.replace('MessageScreen', {
                  message: 'Restaurant Updated!',
                }),
              ),
            );
          }}>
          {({values, handleChange, errors, handleSubmit, setFieldValue}) => (
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
                <View style={styles.activeContainer}>
                  <Text>Active </Text>
                  <Switch
                    value={values.status === 'active' ? true : false}
                    onValueChange={() =>
                      setFieldValue(
                        'status',
                        values.status === 'active' ? 'inactive' : 'active',
                      )
                    }
                  />
                </View>
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
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  activeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RestaurantDetailsScreen;

import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList, View} from 'react-native';
import {Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import ActionButton from '../components/actionButton';
import AdminField from '../components/adminField';
import {getRestaurants} from '../redux/thunks/restaurantThunks';
import {Formik} from 'formik';
import TextInputField from '../components/textInputField';
import DropDownPicker from 'react-native-dropdown-picker';
import HideKeyboard from '../components/hideKeyboard';

const ManageRestaurantsScreen = () => {
  const {restaurants, restaurantsById} = useSelector(
    state => state.restaurantReducer,
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [dropdownVIsible, setDropdownVisible] = useState(false);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants({onFinish: () => {}}));
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(
      getRestaurants({
        onFinish: () => setIsFetching(false),
      }),
    );
  };

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={restaurants}
          keyExtractor={restaurant => restaurant}
          renderItem={restaurant => (
            <AdminField
              id={restaurant.item}
              title={restaurantsById[restaurant.item].name}
              description={restaurantsById[restaurant.item].cost}
              icon="food"
              onPress={() => {
                setSelectedRestaurant(restaurantsById[restaurant.item]);
                setValue(restaurantsById[restaurant.item].status);
              }}
            />
          )}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
        {/* {selectedRestaurant ? ( */}
        <Modal
          visible={selectedRestaurant}
          onDismiss={() => {
            setSelectedRestaurant(null);
            setValue(null);
            setDropdownVisible(false);
          }}
          contentContainerStyle={{
            padding: 20,
            marginHorizontal: 20,
            backgroundColor: 'white',
          }}>
          <View>
            <Text style={styles.title}>Update Restaurant</Text>
            <Formik
              initialValues={{
                name: selectedRestaurant?.name,
                cost: `${selectedRestaurant?.cost}`,
                status: selectedRestaurant?.status,
              }}
              onSubmit={values => {
                values.status = value;
                console.log('submitting form with ', values);
              }}>
              {({values, handleChange, errors, handleSubmit}) => (
                <>
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
                  <DropDownPicker
                    open={dropdownVIsible}
                    value={value}
                    items={[
                      {label: 'Active', value: 'active'},
                      {label: 'Inactive', value: 'inactive'},
                    ]}
                    setOpen={setDropdownVisible}
                    setValue={setValue}
                  />
                  <ActionButton
                    text="Update Restaurant"
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </View>
        </Modal>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ManageRestaurantsScreen;

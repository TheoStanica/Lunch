import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, StatusBar, Text} from 'react-native';
import {Subheading} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getRestaurants} from '../../redux/thunks/restaurantThunks';
import CourseAccordion from '../../components/courseAccordion';
import {createMenu} from '../../redux/thunks/menuThunks';

const CreateMenuScreen = ({navigation}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const {restaurants, restaurantsById} = useSelector(
    state => state.restaurantReducer,
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();

  const generateRestaurantItems = () => {
    const items = [];
    restaurants.forEach(restaurantId => {
      items.push({
        label: restaurantsById[restaurantId].name,
        value: restaurantsById[restaurantId].id,
      });
    });
    return items;
  };

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  useEffect(() => {
    if (selectedRestaurant) setErrors('');
  }, [selectedRestaurant]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFF1CA" barStyle="dark-content" />
      <View style={styles.body}>
        <Subheading>Select a restaurant:</Subheading>
        <DropDownPicker
          open={openDropDown}
          value={selectedRestaurant}
          setValue={setSelectedRestaurant}
          setOpen={setOpenDropDown}
          items={generateRestaurantItems()}
          style={styles.dropDownPicker}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          placeholder="Select a restaurant"
          style={{
            backgroundColor: 'transparent',
            borderColor: '#0007',
            borderWidth: 0.3,
          }}
          selectedItemContainerStyle={{backgroundColor: '#4A6572'}}
          selectedItemLabelStyle={{color: 'white'}}
          dropDownContainerStyle={{
            backgroundColor: '#FFF1CA',
            borderColor: '#0007',
            borderWidth: 0.3,
          }}
        />
        {errors ? <Text style={styles.errorMessage}>{errors}</Text> : null}
        <CourseAccordion
          onSubmit={menu => {
            if (!selectedRestaurant) {
              setErrors('Please select a restaurant');
            } else {
              dispatch(
                createMenu({menu, restaurantId: selectedRestaurant}, () =>
                  navigation.reset({
                    routes: [
                      {name: 'HomeScreen'},
                      {
                        name: 'MessageScreen',
                        params: {message: 'Menu created!'},
                      },
                    ],
                  }),
                ),
              );
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
  },
});

export default CreateMenuScreen;

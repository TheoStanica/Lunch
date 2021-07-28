import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Subheading} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getRestaurants} from '../../redux/thunks/restaurantThunks';
import CourseAccordion from '../../components/courseAccordion';

const CreateMenuScreen = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const {restaurants, restaurantsById} = useSelector(
    state => state.restaurantReducer,
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFF1CA" barStyle="dark-content" />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
          />
          <CourseAccordion />
        </ScrollView>
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
});

export default CreateMenuScreen;

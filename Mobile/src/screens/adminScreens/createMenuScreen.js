import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  View,
} from 'react-native';
import {Title} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getRestaurants} from '../../redux/thunks/restaurantThunks';
import MenuCreator from '../../components/menuCreator';
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
      <View style={styles.restaurantContainer}>
        <Title>Select a restaurant:</Title>
        <DropDownPicker
          open={openDropDown}
          value={selectedRestaurant}
          setValue={setSelectedRestaurant}
          setOpen={setOpenDropDown}
          items={generateRestaurantItems()}
          style={styles.dropDownPicker}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          placeholder="Select a restaurant"
          style={styles.dropdownStyle}
          selectedItemContainerStyle={{backgroundColor: '#4A6572'}}
          selectedItemLabelStyle={styles.selectedItemLabel}
          dropDownContainerStyle={styles.dropdownContainer}
        />
        {errors ? <Text style={styles.errorMessage}>{errors}</Text> : null}
      </View>
      <ScrollView
        style={styles.body}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <MenuCreator
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
      </ScrollView>
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
    flex: 1,
    paddingHorizontal: 15,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
  },
  dropdownStyle: {
    backgroundColor: 'transparent',
    borderColor: '#0007',
    borderWidth: 0.3,
  },
  selectedItemLabel: {
    color: 'white',
  },
  dropdownContainer: {
    backgroundColor: '#FFF1CA',
    borderColor: '#0007',
    borderWidth: 0.3,
  },
  restaurantContainer: {
    marginHorizontal: 15,
    zIndex: 1000,
  },
});

export default CreateMenuScreen;

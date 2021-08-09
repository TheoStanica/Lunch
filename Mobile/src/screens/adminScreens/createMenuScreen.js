import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getRestaurants} from '../../redux/thunks/restaurantThunks';
import {createMenu} from '../../redux/thunks/menuThunks';
import MenuCreator from '../../components/menuCreator';
import CustomDropDownPicker from '../../components/customDropDownPicker';
import HideKeyboard from '../../components/hideKeyboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
      if (restaurantsById[restaurantId].status === 'active')
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
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFF1CA" barStyle="dark-content" />
        <CustomDropDownPicker
          text="Select a restaurant: "
          openDropDown={openDropDown}
          selectedItem={selectedRestaurant}
          setSelectedItem={setSelectedRestaurant}
          setOpenDropDown={setOpenDropDown}
          items={generateRestaurantItems()}
          placeholder="Select a restaurant"
          textStyle={{fontSize: 21}}
        />
        {errors ? <Text style={styles.errorMessage}>{errors}</Text> : null}
        <KeyboardAwareScrollView
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </HideKeyboard>
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
    fontSize: 12,
    color: '#A52630',
    marginLeft: 15,
  },
});

export default CreateMenuScreen;

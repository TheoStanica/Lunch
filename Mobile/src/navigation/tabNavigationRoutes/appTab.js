import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../redux/thunks/userThunks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../stackNavigationRoutes/homeStack';
import AdminStack from '../stackNavigationRoutes/adminStack';
import ProfileStack from '../stackNavigationRoutes/profileStack';
import LoadingScreen from '../../screens/loadingScreen';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  const {role} = useSelector(state => state.userReducer);
  const [fetchedUser, setFetchedUser] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetchedUser)
      setTimeout(() => {
        dispatch(getUser(() => setFetchedUser(true)));
      }, 1000);
  }, []);

  return fetchedUser ? (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {backgroundColor: '#4A6572'},
        style: {backgroundColor: '#4A6572'},
        inactiveTintColor: 'white',
        activeTintColor: '#FBBC00',
      }}
      lazy={true}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
        }}
      />
      {role === 'admin' ? (
        <Tab.Screen
          name="AdminStack"
          component={AdminStack}
          options={{
            tabBarLabel: 'Admin',
            tabBarIcon: ({color}) => (
              <Icon name="shield-account" size={25} color={color} />
            ),
          }}
        />
      ) : null}
      {/* <Tab.Screen
        name="ThreadsStack"
        component={ThreadsStack}
        options={{
          tabBarLabel: 'Threads',
          tabBarIcon: ({color}) => <Icon name="chat" size={25} color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="account" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  ) : (
    <LoadingScreen />
  );
};

export default AppTab;

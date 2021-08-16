import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../stackNavigationRoutes/homeStack';
import AdminStack from '../stackNavigationRoutes/adminStack';
import ProfileStack from '../stackNavigationRoutes/profileStack';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  const {role} = useSelector(state => state.userReducer);

  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {backgroundColor: '#4A6572'},
        style: {backgroundColor: '#4A6572'},
        inactiveTintColor: 'white',
        activeTintColor: '#FBBC00',
      }}
      screenOptions={{unmountOnBlur: true}}>
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
            unmountOnBlur: true,
            tabBarLabel: 'Admin',
            tabBarIcon: ({color}) => (
              <Icon name="shield-account" size={25} color={color} />
            ),
          }}
        />
      ) : (
        <></>
      )}
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
          unmountOnBlur: true,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="account" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTab;

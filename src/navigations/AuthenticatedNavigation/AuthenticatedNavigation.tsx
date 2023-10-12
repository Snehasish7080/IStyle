import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import TabNavigation from '../TabNavigation/TabNavigation';
import {AuthenticatedRouteList} from './AuthenticatedNavigationTypes';

const Stack = createStackNavigator<AuthenticatedRouteList>();

const AuthenticatedNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreenNavigation">
      <Stack.Screen
        name="HomeScreenNavigation"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigation;

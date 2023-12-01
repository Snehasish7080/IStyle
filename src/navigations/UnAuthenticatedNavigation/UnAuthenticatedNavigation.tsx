import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import EmailOtpScreen from '../../screens/EmailOtpScreen/EmailOtpScreen';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';
import {UnAuthenticatedRouteList} from './UnAuthenticatedNavigationTypes';

const Stack = createStackNavigator<UnAuthenticatedRouteList>();

const UnAuthenticatedNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmailOtpScreen"
        component={EmailOtpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default UnAuthenticatedNavigation;

import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ParentRouteList} from './ParentNavigationTypes';
import UnAuthenticatedNavigation from '../UnAuthenticatedNavigation/UnAuthenticatedNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MediaGalleryScreen from '../../screens/MediaGalleryScreen/MediaGalleryScreen';
import CreateScreen from '../../screens/CreateScreen/CreateScreen';
import TagScreen from '../../screens/TagScreen/TagScreen';

const Stack = createStackNavigator<ParentRouteList>();

const ParentNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'UnAuthenticated'}>
      <Stack.Screen
        name="UnAuthenticated"
        component={UnAuthenticatedNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Authenticated"
        component={AuthenticatedNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MediaGalleryScreen"
        component={MediaGalleryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TagScreen"
        component={TagScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ParentNavigation;

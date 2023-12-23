import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ParentRouteList} from './ParentNavigationTypes';
import UnAuthenticatedNavigation from '../UnAuthenticatedNavigation/UnAuthenticatedNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import MediaGalleryScreen from '../../screens/MediaGalleryScreen/MediaGalleryScreen';
import CreateScreen from '../../screens/CreateScreen/CreateScreen';
import TagScreen from '../../screens/TagScreen/TagScreen';
import CreatorProfileScreen from '../../screens/CreatorProfileScreen/CreatorProfileScreen';
import StyleViewScreen from '../../screens/StyleViewScreen/StyleViewScreen';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';

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
      <Stack.Screen
        name="CreatorProfileScreen"
        component={CreatorProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StyleViewScreen"
        component={StyleViewScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={ProfileNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ParentNavigation;

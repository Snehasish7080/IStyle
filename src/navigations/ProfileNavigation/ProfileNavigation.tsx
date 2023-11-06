import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import StyleViewScreen from '../../screens/StyleViewScreen/StyleViewScreen';
import UpdateBioScreen from '../../screens/UpdateBioScreen/UpdateBioScreen';
import UpdateNameScreen from '../../screens/UpdateNameScreen/UpdateNameScreen';
import UpdateProfileScreen from '../../screens/UpdateProfileScreen/UpdateProfileScreen';
import {ProfileNavigationRouteList} from './ProfileNavigationTypes';

const Stack = createStackNavigator<ProfileNavigationRouteList>();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateNameScreen"
        component={UpdateNameScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateBioScreen"
        component={UpdateBioScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StyleViewScreen"
        component={StyleViewScreen}
        options={{
          headerShown: false,
          presentation: 'card',
          cardStyleInterpolator: ({layouts, current, next}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                  {
                    scale: next
                      ? next.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.1],
                        })
                      : current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1],
                        }),
                  },
                ],

                opacity: next
                  ? next.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    })
                  : current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1],
                    }),
              },
            };
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

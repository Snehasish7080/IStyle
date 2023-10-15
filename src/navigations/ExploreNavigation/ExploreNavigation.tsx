import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ExploreScreen from '../../screens/ExploreScreen/ExploreScreen';
import StyleViewScreen from '../../screens/StyleViewScreen/StyleViewScreen';
import {ExploreNavigationRouteList} from './ExploreNavigationTypes';

const Stack = createStackNavigator<ExploreNavigationRouteList>();

const ExploreNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ExploreScreen">
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
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

export default ExploreNavigation;

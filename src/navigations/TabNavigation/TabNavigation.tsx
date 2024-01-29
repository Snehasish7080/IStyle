import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ExploreIcon from '../../atoms/ExploreIcon/ExploreIcon';
import HomeIcon from '../../atoms/HomeIcon/HomeIcon';
import ProfileIcon from '../../atoms/ProfileIcon/ProfileIcon';
import TrendIcon from '../../atoms/TrendIcon/TrendIcon';
import AppBottomTabBar from '../../molecules/AppBottomTabBar/AppBottomTabBar';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import LeaderboardScreen from '../../screens/LeaderboardScreen/LeaderboardScreen';
import {Colors} from '../../utils/theme';
import ExploreNavigation from '../ExploreNavigation/ExploreNavigation';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import {TabNavigationRouteList} from './TabNavigationTypes';

const Tab = createBottomTabNavigator<TabNavigationRouteList>();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        return <AppBottomTabBar {...props} />;
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <HomeIcon isFocused={focused} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ExploreNavigation"
        component={ExploreNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return <ExploreIcon isFocused={focused} />;
          },
        }}
      />
      <Tab.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TrendIcon
                color={focused ? Colors.dark : Colors.placeholder}
                size={22}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({focused}) => {
            return <ProfileIcon isFocused={focused} size={18} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

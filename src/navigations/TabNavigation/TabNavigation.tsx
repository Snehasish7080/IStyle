import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ExploreIcon from '../../atoms/ExploreIcon/ExploreIcon';
import HomeIcon from '../../atoms/HomeIcon/HomeIcon';
import ProfileIcon from '../../atoms/ProfileIcon/ProfileIcon';
import AppBottomTabBar from '../../molecules/AppBottomTabBar/AppBottomTabBar';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import ExploreNavigation from '../ExploreNavigation/ExploreNavigation';
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
        name="ProfileScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({focused}) => {
            return <ProfileIcon isFocused={focused} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

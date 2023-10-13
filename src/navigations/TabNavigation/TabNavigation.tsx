import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import ExploreIcon from '../../atoms/ExploreIcon/ExploreIcon';
import HomeIcon from '../../atoms/HomeIcon/HomeIcon';
import ProfileIcon from '../../atoms/ProfileIcon/ProfileIcon';
import AppBottomTabBar from '../../molecules/AppBottomTabBar/AppBottomTabBar';
// import AppHeader from '../../molecules/AppHeader/AppHeader';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
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
          title: 'Feed',
          // header: () => <AppHeader hideBack={true} mainTitle="Feed" />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={HomeScreen}
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

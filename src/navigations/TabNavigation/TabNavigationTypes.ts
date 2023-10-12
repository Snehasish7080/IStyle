import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type TabNavigationRouteList = {
  HomeScreen: undefined;
  ExploreScreen: undefined;
  ProfileScreen: undefined;
};
export type TabNavigationProp<T extends keyof TabNavigationRouteList> =
  BottomTabScreenProps<TabNavigationRouteList, T>;

export type TabNavProps<T extends keyof TabNavigationRouteList> =
  BottomTabScreenProps<TabNavigationRouteList, T>;

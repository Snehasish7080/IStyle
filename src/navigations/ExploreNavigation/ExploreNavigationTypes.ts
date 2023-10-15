import {StackScreenProps} from '@react-navigation/stack';

export type ExploreNavigationRouteList = {
  ExploreScreen: undefined;
  StyleViewScreen: {image: string; key: string};
};
export type ExploreNavigationProp<T extends keyof ExploreNavigationRouteList> =
  StackScreenProps<ExploreNavigationRouteList, T>;

export type ExploreNavProps<T extends keyof ExploreNavigationRouteList> =
  StackScreenProps<ExploreNavigationRouteList, T>;

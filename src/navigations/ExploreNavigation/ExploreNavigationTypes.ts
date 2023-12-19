import {StackScreenProps} from '@react-navigation/stack';
import {IStyle} from '../../interface/styleInterface';

export type ExploreNavigationRouteList = {
  ExploreScreen: undefined;
  StyleViewScreen: {style: IStyle};
};
export type ExploreNavigationProp<T extends keyof ExploreNavigationRouteList> =
  StackScreenProps<ExploreNavigationRouteList, T>;

export type ExploreNavProps<T extends keyof ExploreNavigationRouteList> =
  StackScreenProps<ExploreNavigationRouteList, T>;

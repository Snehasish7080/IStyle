import {StackScreenProps} from '@react-navigation/stack';

export type AuthenticatedRouteList = {
  HomeScreenNavigation: undefined;
  CreateScreen: undefined;
  EditScreen: {
    image: string;
    scale: number;
    translateX: number;
    translateY: number;
  };
};
export type AuthenticatedNavigationProp<
  T extends keyof AuthenticatedRouteList,
> = StackScreenProps<AuthenticatedRouteList, T>;

export type AuthenticatedNavProps<T extends keyof AuthenticatedRouteList> =
  StackScreenProps<AuthenticatedRouteList, T>;

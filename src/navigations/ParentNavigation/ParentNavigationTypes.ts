import {StackScreenProps} from '@react-navigation/stack';

export type ParentRouteList = {
  UnAuthenticated: undefined;
  Authenticated: undefined;
  MediaGalleryScreen: undefined;
};
export type ParentNavigationProp<T extends keyof ParentRouteList> =
  StackScreenProps<ParentRouteList, T>;

export type ParentNavProps<T extends keyof ParentRouteList> = StackScreenProps<
  ParentRouteList,
  T
>;

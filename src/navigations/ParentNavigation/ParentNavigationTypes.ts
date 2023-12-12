import {StackScreenProps} from '@react-navigation/stack';
import {ILink} from '../../interface/linkInterface';

export type ParentRouteList = {
  UnAuthenticated: undefined;
  Authenticated: undefined;
  MediaGalleryScreen: undefined;
  TagScreen: {
    image: string;
    links: ILink[];
  };
  CreateScreen: {
    postUrl: string;
  };
  CreatorProfileScreen: {
    userName: string;
  };
};
export type ParentNavigationProp<T extends keyof ParentRouteList> =
  StackScreenProps<ParentRouteList, T>;

export type ParentNavProps<T extends keyof ParentRouteList> = StackScreenProps<
  ParentRouteList,
  T
>;

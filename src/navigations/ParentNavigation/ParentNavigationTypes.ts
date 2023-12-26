import {StackScreenProps} from '@react-navigation/stack';
import {ILink} from '../../interface/linkInterface';
import {IStyle} from '../../interface/styleInterface';

export type ParentRouteList = {
  UnAuthenticated: undefined;
  Authenticated: undefined;
  MediaGalleryScreen: undefined;
  TagScreen: {
    image: string;
    links: ILink[];
    hashtags: string[];
  };
  CreateScreen: {
    postUrl: string;
  };
  CreatorProfileScreen: {
    userName: string;
  };
  StyleViewScreen: {style: IStyle};
  UserProfileScreen: undefined;
};
export type ParentNavigationProp<T extends keyof ParentRouteList> =
  StackScreenProps<ParentRouteList, T>;

export type ParentNavProps<T extends keyof ParentRouteList> = StackScreenProps<
  ParentRouteList,
  T
>;

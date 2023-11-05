import {StackScreenProps} from '@react-navigation/stack';

export type ProfileNavigationRouteList = {
  ProfileScreen: undefined;
  UpdateProfileScreen: undefined;
  UpdateNameScreen: undefined;
  UpdateBioScreen: undefined;
  UpdateGenderScreen: undefined;
  StyleViewScreen: {image: string; key: string};
};
export type ProfileNavigationProp<T extends keyof ProfileNavigationRouteList> =
  StackScreenProps<ProfileNavigationRouteList, T>;

export type ProfileNavProps<T extends keyof ProfileNavigationRouteList> =
  StackScreenProps<ProfileNavigationRouteList, T>;

import {StackScreenProps} from '@react-navigation/stack';
import {IStyle} from '../../interface/styleInterface';

export type ProfileNavigationRouteList = {
  ProfileScreen: undefined;
  UpdateProfileScreen: undefined;
  UpdateNameScreen: undefined;
  UpdateBioScreen: undefined;
  UpdateGenderScreen: undefined;
  StyleViewScreen: {style: IStyle};
};
export type ProfileNavigationProp<T extends keyof ProfileNavigationRouteList> =
  StackScreenProps<ProfileNavigationRouteList, T>;

export type ProfileNavProps<T extends keyof ProfileNavigationRouteList> =
  StackScreenProps<ProfileNavigationRouteList, T>;

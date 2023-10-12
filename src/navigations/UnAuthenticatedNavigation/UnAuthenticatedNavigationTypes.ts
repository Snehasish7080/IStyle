import {StackScreenProps} from '@react-navigation/stack';

export type UnAuthenticatedRouteList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
};
export type UnAuthenticatedNavigationProp<
  T extends keyof UnAuthenticatedRouteList,
> = StackScreenProps<UnAuthenticatedRouteList, T>;

export type UnAuthenticatedNavProps<T extends keyof UnAuthenticatedRouteList> =
  StackScreenProps<UnAuthenticatedRouteList, T>;

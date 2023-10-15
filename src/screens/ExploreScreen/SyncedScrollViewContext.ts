import {createContext} from 'react';
import {SharedValue} from 'react-native-reanimated';

export interface syncedScrollViewContextState {
  activeScrollView: SharedValue<string> | undefined;
  offsetPercent: SharedValue<number> | undefined;
  scrollY: SharedValue<number> | undefined;
  prevScrollY: SharedValue<number> | undefined;
  previousScrollValue: SharedValue<number> | undefined;
}

const defaultState: syncedScrollViewContextState = {
  activeScrollView: undefined,
  offsetPercent: undefined,
  scrollY: undefined,
  prevScrollY: undefined,
  previousScrollValue: undefined,
};

export const SyncedScrollViewContext =
  createContext<syncedScrollViewContextState>(defaultState);

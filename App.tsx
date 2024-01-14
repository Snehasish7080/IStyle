/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ParentNavigation from './src/navigations/ParentNavigation/ParentNavigation';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {Provider} from 'react-redux';
import {store} from './src/feature/store';

type State = {
  isScrolling?: SharedValue<number>;
};
const initialValue: State = {
  isScrolling: undefined,
};
export const MainContext = createContext<State>(initialValue);

function App(): JSX.Element {
  const isScrolling = useSharedValue<number>(0);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <MainContext.Provider
        value={{
          isScrolling,
        }}>
        <NavigationContainer>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'light-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />

            <ParentNavigation />
          </SafeAreaView>
        </NavigationContainer>
      </MainContext.Provider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

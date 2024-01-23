import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Platform,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {Colors} from '../../utils/theme';
import {styles} from './AppBottomTabBarStyles';

type AppBottomTabBarProps = {
  descriptors: BottomTabDescriptorMap;
  insets: EdgeInsets;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
};
const AppBottomTabBar: React.FC<AppBottomTabBarProps> = ({
  descriptors,
  navigation,
  state,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let keyboardEventListeners;
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach(eventListener =>
            eventListener.remove(),
          );
      }
    };
  }, []);

  if (!visible) {
    return null;
  }
  return (
    <View style={[styles.mainContainer]}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const onPress = () => {
            navigation.navigate(route.name, {...route.params});
          };

          const isFocused = state.index === index;

          const icons = () => {
            if (options?.tabBarIcon) {
              return options?.tabBarIcon({
                focused: isFocused,
                color: 'black',
                size: 10,
              });
            }
          };
          return (
            <TouchableOpacity
              onPress={() => {
                onPress();
                Vibration.vibrate(1);
              }}
              key={route.name}
              style={[
                styles.tab,
                {
                  backgroundColor: isFocused ? Colors.primary : Colors.black,
                },
              ]}
              activeOpacity={0.7}>
              {icons()}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AppBottomTabBar;

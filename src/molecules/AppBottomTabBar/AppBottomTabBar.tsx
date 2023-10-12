import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Vibration, View} from 'react-native';
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
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

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

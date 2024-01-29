import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {styles} from './ContainerStyles';

type ContainerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
};
const Container: React.FC<ContainerProps> = ({
  children,
  style,
  mainContainerStyle,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Container;

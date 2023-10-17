import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {styles} from './ContainerStyles';

type ContainerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};
const Container: React.FC<ContainerProps> = ({children, style}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.container, style]}>{children}</View>
    </View>
  );
};

export default Container;

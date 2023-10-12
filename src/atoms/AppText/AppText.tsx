import {View, Text, TextProps} from 'react-native';
import React from 'react';
import {Colors, FontFamily} from '../../utils/theme';

type AppTextProps = TextProps & {
  lineHeight: number;
};
const AppText: React.FC<AppTextProps> = ({lineHeight, ...props}) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: FontFamily.LatoRegular,
          lineHeight: lineHeight * 1.2,
          color: Colors.black,
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

export default AppText;

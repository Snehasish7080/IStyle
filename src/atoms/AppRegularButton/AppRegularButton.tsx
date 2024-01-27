import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import AppText from '../AppText/AppText';
import {Colors, FontFamily} from '../../utils/theme';
import {scale, verticalScale} from 'react-native-size-matters';
import {getFontSize} from '../../utils/getFontSize';

type AppRegularButtonProps = TouchableOpacityProps & {
  children: string;
};
const AppRegularButton: React.FC<AppRegularButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      style={[
        {
          backgroundColor: Colors.primary,
          borderRadius: scale(16),
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: verticalScale(16),
        },
        style,
      ]}>
      <AppText
        lineHeight={14}
        style={{
          color: Colors.white,
          fontSize: getFontSize(14),
          fontFamily: FontFamily.LatoBold,
        }}>
        {children}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppRegularButton;

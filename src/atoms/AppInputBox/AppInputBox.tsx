import React from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, FontFamily} from '../../utils/theme';
import AppText from '../AppText/AppText';

type AppInputBoxProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  label?: string;
};
const AppInputBox: React.FC<AppInputBoxProps> = ({
  style,
  label,
  labelStyle,
  ...props
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.textInputBackground,
          borderRadius: 16,
        },
        style,
      ]}>
      {Boolean(label) && (
        <AppText
          lineHeight={14}
          style={[
            labelStyle,
            {
              position: 'absolute',
              top: -24,
              left: 10,
            },
          ]}>
          {label}
        </AppText>
      )}
      <TextInput
        {...props}
        style={[
          {
            paddingHorizontal: 20,
            color: Colors.black,
            fontFamily: FontFamily.LatoRegular,
            height: '100%',
            width: '100%',
          },
        ]}
        placeholderTextColor={Colors.placeholder}
      />
    </View>
  );
};

export default AppInputBox;

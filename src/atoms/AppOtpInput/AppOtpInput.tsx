import {View, Text} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Control, FieldValues, useController} from 'react-hook-form';
import AppText from '../AppText/AppText';
import {Colors, FontFamily} from '../../utils/theme';

type AppOtpInputProps = {
  control: Control<any, any>;
  name: string;
};
const AppOtpInput: React.FC<AppOtpInputProps> = ({name, control}) => {
  const {field, fieldState} = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <View
      style={{
        borderColor: 'red',
        height: 80,
        alignItems: 'center',
      }}>
      <OTPInputView
        pinCount={6}
        style={{
          width: '85%',
        }}
        autoFocusOnLoad
        codeInputFieldStyle={{
          borderWidth: 1,
          borderColor: Colors.gray,
          borderRadius: 10,
          fontSize: 14,
          fontFamily: FontFamily.LatoRegular,
          color: Colors.dark,
        }}
        onCodeChanged={field.onChange}
        code={field.value}
      />
      {fieldState?.invalid && (
        <AppText
          lineHeight={12}
          style={{
            fontSize: 12,
            color: Colors.error,
          }}>
          {fieldState.error?.message}
        </AppText>
      )}
    </View>
  );
};

export default AppOtpInput;

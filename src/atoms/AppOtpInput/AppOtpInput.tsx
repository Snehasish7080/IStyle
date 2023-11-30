import {View, Text} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const AppOtpInput = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'red',
        height: 80,
      }}>
      <OTPInputView
        pinCount={6}
        style={{
          borderWidth: 2,
          width: '80%',
        }}
      />
    </View>
  );
};

export default AppOtpInput;

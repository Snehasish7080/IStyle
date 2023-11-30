import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './EmailOtpScreenStyles';
import AppOtpInput from '../../atoms/AppOtpInput/AppOtpInput';

const EmailOtpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <AppOtpInput />
      </View>
    </View>
  );
};

export default EmailOtpScreen;

import {View, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import React from 'react';
import {UnAuthenticatedNavProps} from '../../navigations/UnAuthenticatedNavigation/UnAuthenticatedNavigationTypes';
import BackButton from '../../atoms/BackButton/BackButton';
import AppText from '../../atoms/AppText/AppText';
import {styles} from './LoginScreenStyles';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import {StackActions} from '@react-navigation/native';
import AppButton from '../../atoms/AppButton/AppButton';
import {horizontalScale} from '../../utils/scale';

const LoginScreen: React.FC<UnAuthenticatedNavProps<'LoginScreen'>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {/* <AppLogo /> */}
      <AppText lineHeight={42} style={styles.logoTitle}>
        IStyle
      </AppText>
      <KeyboardAvoidingView>
        <AppInputBox
          style={styles.inputBox}
          placeholder={'Enter Email Address'}
          label={'Email'}
          labelStyle={{
            fontSize: 14,
          }}
        />
        <AppInputBox
          style={[
            styles.inputBox,
            {
              marginTop: 16,
            },
          ]}
          placeholder={'Enter Password'}
          label={'Password'}
          labelStyle={{
            fontSize: 14,
          }}
        />
        <AppButton
          width={horizontalScale(302)}
          height={56}
          onPress={() => {
            navigation.dispatch(StackActions.replace('Authenticated'));
          }}>
          Login
        </AppButton>
      </KeyboardAvoidingView>
      <View style={styles.notRegisteredContainer}>
        <AppText lineHeight={14} style={styles.notRegistered}>
          Don't have an account?
        </AppText>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('SignUpScreen');
          }}>
          <AppText lineHeight={14} style={styles.signUp}>
            Sign up
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

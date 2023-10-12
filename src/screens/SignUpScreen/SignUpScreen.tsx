import {View, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './SignUpScreenStyles';
import AppText from '../../atoms/AppText/AppText';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import AppButton from '../../atoms/AppButton/AppButton';
import {horizontalScale} from '../../utils/scale';
import {UnAuthenticatedNavProps} from '../../navigations/UnAuthenticatedNavigation/UnAuthenticatedNavigationTypes';

const SignUpScreen: React.FC<UnAuthenticatedNavProps<'SignUpScreen'>> = ({
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
          style={[
            styles.inputBox,
            {
              marginTop: 0,
            },
          ]}
          placeholder={'Enter First Name'}
          label={'First Name'}
          labelStyle={{
            fontSize: 14,
          }}
        />
        <AppInputBox
          style={styles.inputBox}
          placeholder={'Enter Last Name'}
          label={'Last Name'}
          labelStyle={{
            fontSize: 14,
          }}
        />
        <AppInputBox
          style={styles.inputBox}
          placeholder={'Enter Email Address'}
          label={'Email'}
          labelStyle={{
            fontSize: 14,
          }}
        />
        <AppInputBox
          style={[styles.inputBox]}
          placeholder={'Enter Password'}
          label={'Password'}
          labelStyle={{
            fontSize: 14,
          }}
        />
        <AppButton width={horizontalScale(302)} height={56}>
          Sign up
        </AppButton>
      </KeyboardAvoidingView>
      <View style={styles.notRegisteredContainer}>
        <AppText lineHeight={14} style={styles.notRegistered}>
          Already have an account?
        </AppText>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <AppText lineHeight={14} style={styles.signUp}>
            login
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

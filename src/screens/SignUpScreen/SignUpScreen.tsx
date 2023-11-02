import {View, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './SignUpScreenStyles';
import AppText from '../../atoms/AppText/AppText';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import AppButton from '../../atoms/AppButton/AppButton';
import {horizontalScale} from '../../utils/scale';
import {UnAuthenticatedNavProps} from '../../navigations/UnAuthenticatedNavigation/UnAuthenticatedNavigationTypes';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const schema = yup
  .object({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup
      .string()
      .required('required')
      .email('please enter a valid email'),
    password: yup.string().required('required'),
  })
  .required();

const SignUpScreen: React.FC<UnAuthenticatedNavProps<'SignUpScreen'>> = ({
  navigation,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <View style={styles.container}>
      {/* <AppLogo /> */}
      <AppText lineHeight={42} style={styles.logoTitle}>
        IStyle
      </AppText>
      <KeyboardAvoidingView>
        <AppInputBox
          name="firstName"
          control={control}
          style={[styles.inputBox]}
          placeholder={'Enter First Name'}
          label={'First Name'}
          labelStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            marginBottom: 20,
          }}
        />
        <AppInputBox
          name="lastName"
          control={control}
          style={styles.inputBox}
          placeholder={'Enter Last Name'}
          label={'Last Name'}
          labelStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            marginBottom: 20,
          }}
        />
        <AppInputBox
          name="email"
          control={control}
          style={styles.inputBox}
          placeholder={'Enter Email Address'}
          label={'Email'}
          labelStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            marginBottom: 20,
          }}
        />
        <AppInputBox
          name="password"
          control={control}
          style={[styles.inputBox]}
          placeholder={'Enter Password'}
          label={'Password'}
          labelStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            marginBottom: 60,
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

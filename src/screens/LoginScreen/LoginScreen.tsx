import {StackActions} from '@react-navigation/native';
import React from 'react';
import {KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';

import AppButton from '../../atoms/AppButton/AppButton';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import AppText from '../../atoms/AppText/AppText';
import {useLoginMutation} from '../../feature/services/auth';
import {UnAuthenticatedNavProps} from '../../navigations/UnAuthenticatedNavigation/UnAuthenticatedNavigationTypes';
import {horizontalScale} from '../../utils/scale';
import {styles} from './LoginScreenStyles';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';

type LoginData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .required('email is required')
      .email('please enter a valid email'),
    password: yup.string().required('password is required'),
  })
  .required();

const LoginScreen: React.FC<UnAuthenticatedNavProps<'LoginScreen'>> = ({
  navigation,
}) => {
  const [login] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: LoginData) => {
    try {
      login({
        email: data.email,
        password: data.password,
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            navigation.dispatch(StackActions.replace('Authenticated'));
          }
        });
    } catch (error) {}
  };

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
            handleSubmit(onSubmit)();
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

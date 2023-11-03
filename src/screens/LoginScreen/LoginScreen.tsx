import {yupResolver} from '@hookform/resolvers/yup';
import {StackActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';

import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import AppButton from '../../atoms/AppButton/AppButton';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import AppText from '../../atoms/AppText/AppText';
import {useLoginMutation} from '../../feature/services/auth';
import {UnAuthenticatedNavProps} from '../../navigations/UnAuthenticatedNavigation/UnAuthenticatedNavigationTypes';
import {horizontalScale} from '../../utils/scale';
import {storeToken} from '../../utils/storeToken';
import {styles} from './LoginScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginData = {
  email: string;
  password: string;
};

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup
  .object({
    email: yup
      .string()
      .required('required')
      .matches(EMAIL_REGEX, 'please enter a valid email'),
    password: yup.string().required('required'),
  })
  .required();

const LoginScreen: React.FC<UnAuthenticatedNavProps<'LoginScreen'>> = ({
  navigation,
}) => {
  const [login] = useLoginMutation();

  const {control, handleSubmit} = useForm<LoginData>({
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
            try {
              storeToken(res.token).then(() => {
                navigation.dispatch(StackActions.replace('Authenticated'));
              });
            } catch (e) {
              // saving error
            }
          }
        })
        .catch(err => {
          console.log(err, err.data.success);
        });
    } catch (error) {}
  };

  const getAuthToken = async () => {
    const value = await AsyncStorage.getItem('token');
    if (Boolean(value)) {
      navigation.dispatch(StackActions.replace('Authenticated'));
    }
  };

  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <View style={styles.container}>
      {/* <AppLogo /> */}
      <AppText lineHeight={42} style={styles.logoTitle}>
        IStyle
      </AppText>
      <KeyboardAvoidingView>
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
          keyboardType="email-address"
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

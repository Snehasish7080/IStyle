import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
import {useSignUpMutation} from '../../feature/services/auth';

type SignUpData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
};

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup.object({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  userName: yup.string().lowercase().required('required'),
  email: yup
    .string()
    .required('required')
    .matches(EMAIL_REGEX, 'please enter a valid email'),
  password: yup.string().required('required'),
});

const SignUpScreen: React.FC<UnAuthenticatedNavProps<'SignUpScreen'>> = ({
  navigation,
}) => {
  const [signUp] = useSignUpMutation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<SignUpData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignUpData) => {
    try {
      signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        password: data.password,
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            reset({
              firstName: '',
              lastName: '',
              email: '',
              userName: '',
              password: '',
            });

            navigation.navigate('EmailOtpScreen', {
              token: res.token,
            });
          }
        })
        .catch(err => {
          console.log(err, err.data.success);
        });
    } catch (error) {}
    // navigation.navigate('EmailOtpScreen', {
    //   token: 'fsf',
    // });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          name="userName"
          control={control}
          style={styles.inputBox}
          placeholder={'Enter Username'}
          label={'Username'}
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
            marginBottom: 40,
          }}
        />
        <AppButton
          width={horizontalScale(302)}
          height={56}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}>
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
    </ScrollView>
  );
};

export default SignUpScreen;

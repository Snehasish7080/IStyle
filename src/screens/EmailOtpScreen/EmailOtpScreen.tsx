import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './EmailOtpScreenStyles';
import AppOtpInput from '../../atoms/AppOtpInput/AppOtpInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppButton from '../../atoms/AppButton/AppButton';
import {horizontalScale} from '../../utils/scale';
import AppText from '../../atoms/AppText/AppText';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import {UnAuthenticatedNavProps} from '../../navigations/UnAuthenticatedNavigation/UnAuthenticatedNavigationTypes';
import {Colors} from '../../utils/theme';
import {useVerifyEmailMutation} from '../../feature/services/auth';
import {StackActions} from '@react-navigation/native';
import {storeToken} from '../../utils/storeToken';

type EmailOtpData = {
  otp: string;
};

const schema = yup.object({
  otp: yup.string().length(6, 'invalid otp').required('required'),
});

const EmailOtpScreen: React.FC<UnAuthenticatedNavProps<'EmailOtpScreen'>> = ({
  navigation,
  route,
}) => {
  const {token} = route?.params;
  const [verifyEmail] = useVerifyEmailMutation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<EmailOtpData>({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: EmailOtpData) => {
    try {
      verifyEmail({
        token,
        otp: data.otp,
      })
        .unwrap()
        .then(res => {
          storeToken(res.token).then(() => {
            navigation.dispatch(StackActions.replace('Authenticated'));
          });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error: any) {
      console.log(error, error.data.success);
    }
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={1}
        onPress={() => {
          navigation.goBack();
        }}
        hitSlop={{
          top: 10,
          bottom: 10,
          right: 10,
          left: 10,
        }}>
        <BackIcon color={Colors.white} />
      </TouchableOpacity>
      <View style={styles.bodyContainer}>
        <AppText lineHeight={14} style={styles.title}>
          Otp Verification
        </AppText>
        <AppText lineHeight={14} style={styles.subTitle}>
          Enter 6 digit verification code sent to your email
        </AppText>
        <AppOtpInput name="otp" control={control} />
        <AppButton
          style={{
            marginTop: 40,
          }}
          width={horizontalScale(302)}
          height={56}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}>
          Submit
        </AppButton>
      </View>
    </View>
  );
};

export default EmailOtpScreen;

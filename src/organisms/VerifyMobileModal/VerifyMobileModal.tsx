import {View, Text, Modal, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './VerifyMobileModalStyles';
import AppText from '../../atoms/AppText/AppText';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import AppButton from '../../atoms/AppButton/AppButton';
import {horizontalScale} from '../../utils/scale';
import AppOtpInput from '../../atoms/AppOtpInput/AppOtpInput';

type VerifyMobileModalProps = {
  visible: boolean;
};
type UpdateMobileData = {
  mobile: string;
};

type VerifyMobileData = {
  otp: string;
};

const updateMobileschema = yup.object({
  mobile: yup.string().length(10, 'invalid mobile').required('required'),
});

const verifyMobileschema = yup.object({
  otp: yup.string().length(6, 'invalid otp').required('required'),
});

const VerifyMobileModal: React.FC<VerifyMobileModalProps> = ({visible}) => {
  const [isMobileSubmit, setIsMobileSubmit] = useState(true);

  const {control, handleSubmit} = useForm<UpdateMobileData>({
    defaultValues: {
      mobile: '',
    },
    resolver: yupResolver(updateMobileschema),
  });

  const {control: verifyMobileControl, handleSubmit: handleVerifyMobileSubmit} =
    useForm<VerifyMobileData>({
      defaultValues: {
        otp: '',
      },
      resolver: yupResolver(verifyMobileschema),
    });

  const onSubmitMobile = (data: UpdateMobileData) => {};
  const onSubmitVerifyMobile = (data: VerifyMobileData) => {};
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          {!isMobileSubmit && (
            <KeyboardAvoidingView
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText lineHeight={14} style={styles.title}>
                Verify Mobile
              </AppText>
              <AppText lineHeight={12} style={styles.subTitle}>
                mobile number is required for validation
              </AppText>
              <AppInputBox
                name="mobile"
                control={control}
                style={styles.inputBox}
                placeholder={'Enter Mobile Number'}
                labelStyle={{
                  fontSize: 14,
                }}
                containerStyle={{
                  marginBottom: 20,
                }}
                keyboardType="phone-pad"
              />
              <AppButton
                width={horizontalScale(302)}
                height={56}
                style={{
                  marginTop: 20,
                }}
                onPress={() => {
                  handleSubmit(onSubmitMobile)();
                }}>
                Submit
              </AppButton>
            </KeyboardAvoidingView>
          )}

          {isMobileSubmit && (
            <KeyboardAvoidingView
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText lineHeight={14} style={styles.title}>
                Otp Verification
              </AppText>
              <AppText lineHeight={14} style={styles.subTitle}>
                Enter 6 digit verification code sent to your mobile
              </AppText>
              <AppOtpInput name="otp" control={verifyMobileControl} />
              <AppButton
                style={{
                  marginTop: 40,
                }}
                width={horizontalScale(302)}
                height={56}
                onPress={() => {
                  handleVerifyMobileSubmit(onSubmitVerifyMobile)();
                }}>
                Submit
              </AppButton>
            </KeyboardAvoidingView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default VerifyMobileModal;

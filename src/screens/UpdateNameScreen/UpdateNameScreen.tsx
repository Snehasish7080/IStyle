import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import AppText from '../../atoms/AppText/AppText';
import Container from '../../atoms/Container/Container';
import {useAppSelector} from '../../feature/hooks';
import {useUpdateUserMutation} from '../../feature/services/user';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {ProfileNavProps} from '../../navigations/ProfileNavigation/ProfileNavigationTypes';
import {styles} from './UpdateNameScreenStyles';

type updateNameData = {
  firstName: string;
  lastName: string;
};

const schema = yup
  .object({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
  })
  .required();

const UpdateNameScreen: React.FC<ProfileNavProps<'UpdateNameScreen'>> = ({
  navigation,
}) => {
  const [updateUser] = useUpdateUserMutation();

  const user = useAppSelector(state => state.userSlice.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<updateNameData>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: updateNameData) => {
    try {
      updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            navigation.goBack();
          }
        })
        .catch(err => {
          console.log(err, err.data.success);
        });
    } catch (error) {}
  };

  return (
    <Container>
      <BackHeader
        title="Edit Name"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
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
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}>
          <AppText lineHeight={14}>Save</AppText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default UpdateNameScreen;

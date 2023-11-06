import React from 'react';
import {ProfileNavProps} from '../../navigations/ProfileNavigation/ProfileNavigationTypes';
import Container from '../../atoms/Container/Container';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import {useAppSelector} from '../../feature/hooks';
import {useUpdateUserMutation} from '../../feature/services/user';
import {yupResolver} from '@hookform/resolvers/yup';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import {styles} from './UpdateBioScreenStyles';
import AppText from '../../atoms/AppText/AppText';

type updateBioData = {
  bio: string;
};

const schema = yup
  .object({
    bio: yup.string().required('required'),
  })
  .required();

const UpdateBioScreen: React.FC<ProfileNavProps<'UpdateBioScreen'>> = ({
  navigation,
}) => {
  const [updateUser] = useUpdateUserMutation();

  const user = useAppSelector(state => state.userSlice.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<updateBioData>({
    defaultValues: {
      bio: user?.bio || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: updateBioData) => {
    try {
      updateUser({
        bio: data.bio,
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
        title="Edit Bio"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <AppInputBox
            name="bio"
            control={control}
            style={[styles.inputBox]}
            placeholder={'add bio about yourself'}
            labelStyle={{
              fontSize: 14,
            }}
            containerStyle={{
              marginBottom: 20,
            }}
            numberOfLines={6}
            maxLength={160}
            textAlignVertical="top"
            multiline
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

export default UpdateBioScreen;

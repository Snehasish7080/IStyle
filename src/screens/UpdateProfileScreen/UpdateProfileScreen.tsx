import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ProfileNavProps} from '../../navigations/ProfileNavigation/ProfileNavigationTypes';
import Container from '../../atoms/Container/Container';
import {styles} from './UpdateProfileScreenStyles';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import AppText from '../../atoms/AppText/AppText';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {useAppSelector} from '../../feature/hooks';

const UpdateProfileScreen: React.FC<ProfileNavProps<'UpdateProfileScreen'>> = ({
  navigation,
}) => {
  const user = useAppSelector(state => state.userSlice.user);
  return (
    <Container>
      <BackHeader
        onBack={() => {
          navigation.goBack();
        }}
        title={'Edit Profile'}
      />

      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1602564183692-3fa56180279b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
              width: 100,
              height: 100,
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            hitSlop={{
              bottom: 10,
              top: 10,
              right: 10,
              left: 10,
            }}>
            <AppText lineHeight={14} style={styles.editPic}>
              edit picture
            </AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            style={styles.info}
            onPress={() => navigation.navigate('UpdateNameScreen')}>
            <AppText lineHeight={14} style={styles.infoTitle}>
              Name
            </AppText>
            <AppText lineHeight={14} style={styles.infoContent}>
              {user?.firstName} {user?.lastName}
            </AppText>
          </TouchableOpacity>
          <View style={styles.info}>
            <AppText lineHeight={14} style={styles.infoTitle}>
              UserName
            </AppText>
            <AppText lineHeight={14} style={styles.infoContent}>
              {user?.userName}
            </AppText>
          </View>
          <View style={styles.info}>
            <AppText lineHeight={14} style={styles.infoTitle}>
              Bio
            </AppText>
            <AppText lineHeight={14} style={styles.infoContent}>
              PIVOTGANG 🏀 CARE FOR ME TOUR OUT NOW 🎙 #CHI-TOWN This remind me
              of before we had insomnia Sleepin' peacefully, never needed a pile
              of drugs
            </AppText>
          </View>
          <View style={styles.info}>
            <AppText lineHeight={14} style={styles.infoTitle}>
              Gender
            </AppText>
            <AppText lineHeight={14} style={styles.infoContent}>
              Male
            </AppText>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default UpdateProfileScreen;

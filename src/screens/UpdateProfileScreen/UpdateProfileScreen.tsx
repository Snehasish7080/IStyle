import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import {ProfileNavProps} from '../../navigations/ProfileNavigation/ProfileNavigationTypes';
import Container from '../../atoms/Container/Container';
import {styles} from './UpdateProfileScreenStyles';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import AppText from '../../atoms/AppText/AppText';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {useAppSelector} from '../../feature/hooks';
import GalleryModal from '../../organisms/GalleryModal/GalleryModal';
import {hasAndroidPermission} from '../../utils/permissions';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';

const UpdateProfileScreen: React.FC<ProfileNavProps<'UpdateProfileScreen'>> = ({
  navigation,
}) => {
  const [visible, setVisible] = useState(false);
  const [medias, setMedias] = useState<PhotoIdentifier[]>([]);

  const user = useAppSelector(state => state.userSlice.user);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const onClickEditProfile = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    getAllPhotos();
    handleVisible();
  };

  const getAllPhotos = async () => {
    const photos = await CameraRoll.getPhotos({
      first: 20,
      groupTypes: 'All',
      assetType: 'Photos',
      include: ['fileSize', 'filename', 'fileExtension'],
    });

    setMedias([...medias, ...photos.edges]);
  };
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
            }}
            onPress={onClickEditProfile}>
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
          <TouchableOpacity
            style={styles.info}
            onPress={() => navigation.navigate('UpdateBioScreen')}>
            <AppText lineHeight={14} style={styles.infoTitle}>
              Bio
            </AppText>
            <AppText lineHeight={14} style={styles.infoContent}>
              {user?.bio ? user?.bio : '< add bio >'}
            </AppText>
          </TouchableOpacity>
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
      <GalleryModal
        visible={visible}
        onClose={handleVisible}
        medias={medias}
        setMedias={setMedias}
      />
    </Container>
  );
};

export default UpdateProfileScreen;

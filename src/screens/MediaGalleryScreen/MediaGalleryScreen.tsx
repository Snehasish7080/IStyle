import {
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../atoms/Container/Container';
import {styles} from './MediaGalleryScreenStyles';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {ParentNavProps} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {hasAndroidPermission} from '../../utils/permissions';
import {IFile} from '../../interface/fileInterface';
import ImageCropper from 'react-native-image-crop-picker';
import {Colors} from '../../utils/theme';

const MediaGalleryScreen: React.FC<ParentNavProps<'MediaGalleryScreen'>> = ({
  navigation,
}) => {
  const {width, height} = useWindowDimensions();
  const [medias, setMedias] = useState<PhotoIdentifier[]>([]);

  const onOpenScreen = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    getAllPhotos();
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

  useEffect(() => {
    onOpenScreen();
  }, []);

  const onClickImage = (file: string) => {
    ImageCropper.openCropper({
      path: file,
      width: 320,
      height: 500,
      mediaType: 'photo',
      cropperStatusBarColor: 'black',
      cropperToolbarTitle: 'Edit',
      cropperChooseColor: Colors.primary,
      hideBottomControls: true,
      enableRotationGesture: true,
      showCropFrame: false,
    })
      .then(image => {
        navigation.navigate('CreateScreen', {
          postUrl: image.path,
        });
      })
      .catch(e => console.log('error', e));
  };

  return (
    <Container style={styles.container}>
      <BackHeader
        onBack={() => {
          navigation.goBack();
        }}
        title={'Select Media'}
      />
      <View>
        <FlatList
          data={medias}
          contentContainerStyle={{
            paddingBottom: 60,
          }}
          keyExtractor={item => item.node.timestamp.toString()}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.image}
                onPress={() => {
                  onClickImage(item.node.image.uri);
                }}>
                <Image
                  source={{uri: item.node.image.uri}}
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Container>
  );
};

export default MediaGalleryScreen;

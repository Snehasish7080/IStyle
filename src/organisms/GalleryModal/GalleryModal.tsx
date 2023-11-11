import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {styles} from './GalleryModalStyles';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {
  useGetPictureUrlQuery,
  useUploadPictureMutation,
} from '../../feature/services/user';
import {IFile} from '../../interface/fileInterface';

type GalleryModalProps = {
  visible: boolean;
  onClose: () => void;
  medias: PhotoIdentifier[];
  setMedias: React.Dispatch<React.SetStateAction<PhotoIdentifier[]>>;
};
const GalleryModal: React.FC<GalleryModalProps> = ({
  visible,
  onClose,
  medias,
  setMedias,
}) => {
  const [file, setFile] = useState<IFile | undefined>(undefined);
  const {data, isSuccess} = useGetPictureUrlQuery(undefined, {
    skip: !Boolean(file),
  });

  const [uploadPicture] = useUploadPictureMutation();

  useEffect(() => {
    if (data && data?.success) {
      if (file) {
        uploadPicture({
          body: file,
          url: data.data.url,
        });
      }
    }
  }, [isSuccess]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.container}>
        <BackHeader
          onBack={() => {
            setMedias([]);
            setFile(undefined);
            onClose();
          }}
          title={'Select Picture'}
        />
        <View style={styles.bodyContainer}>
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
                    setFile({
                      name: item.node.image.filename || '',
                      uri: item.node.image.uri,
                      size: item.node.image.fileSize || 0,
                      type: `image/${item.node.image.extension}`,
                    });
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
      </View>
    </Modal>
  );
};

export default GalleryModal;

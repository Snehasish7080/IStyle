import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import React from 'react';
import {FlatList, Image, Modal, TouchableOpacity, View} from 'react-native';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {styles} from './MediaModalStyles';

type MediaModalProps = {
  visible: boolean;
  onClose: () => void;
  medias: PhotoIdentifier[];
  setMedias: React.Dispatch<React.SetStateAction<PhotoIdentifier[]>>;
  onSelectPhoto: (file: string) => void;
};

const MediaModal: React.FC<MediaModalProps> = ({
  medias,
  onClose,
  setMedias,
  visible,
  onSelectPhoto,
}) => {
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
                    onSelectPhoto(item.node.image.uri);
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

export default MediaModal;

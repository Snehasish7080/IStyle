import {View, Modal, Pressable, Image, FlatList} from 'react-native';
import React from 'react';
import AppText from '../../atoms/AppText/AppText';
import {styles} from './LikedUserModalStyles';
import {data} from '../../utils/dummyData';
import {scale, verticalScale} from 'react-native-size-matters';
import AppButton from '../../atoms/AppButton/AppButton';

type LikedUserModalProps = {
  visible: boolean;
  handleClose: () => void;
};
const LikedUserModal: React.FC<LikedUserModalProps> = ({
  handleClose,
  visible,
}) => {
  return (
    <Modal transparent visible={visible} animationType={'slide'}>
      <View style={styles.mainContainer}>
        <Pressable style={styles.pressable} onPress={handleClose} />
        <View style={styles.modalBody}>
          <View style={styles.gesture} />
          <View style={styles.content}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              ItemSeparatorComponent={() => (
                <View style={{height: verticalScale(2)}} />
              )}
              keyExtractor={item => item.image}
              renderItem={({item}) => {
                return (
                  <View style={styles.userContainer}>
                    <View style={styles.profileContainer}>
                      <Image
                        source={{
                          uri: item.image,
                          width: scale(30),
                          height: scale(30),
                        }}
                        style={styles.avatar}
                      />
                      <AppText lineHeight={14} style={styles.userName}>
                        @rahul56
                      </AppText>
                    </View>
                    <AppButton
                      width={scale(80)}
                      height={verticalScale(30)}
                      hideShadow={true}
                      radius={scale(10)}>
                      Follow
                    </AppButton>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LikedUserModal;

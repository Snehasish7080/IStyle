import {View, Modal, TextInput, Pressable} from 'react-native';
import React from 'react';
import {styles} from './CommentModalStyles';
import CloseIcon from '../../atoms/CloseIcon/CloseIcon';
import AppText from '../../atoms/AppText/AppText';
import {Colors} from '../../utils/theme';
import AppRegularButton from '../../atoms/AppRegularButton/AppRegularButton';

type CommentModalProps = {
  visible: boolean;
  handleClose: () => void;
};
const CommentModal: React.FC<CommentModalProps> = ({visible, handleClose}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType={'slide'}
      onRequestClose={handleClose}>
      <View style={styles.mainContainer}>
        <View style={styles.modalBody}>
          <View style={styles.header}>
            <Pressable
              onPress={handleClose}
              hitSlop={{
                right: 10,
                left: 10,
                bottom: 10,
                top: 10,
              }}>
              <CloseIcon size={24} />
            </Pressable>
            <AppText lineHeight={14} style={styles.title}>
              Add Comment
            </AppText>
          </View>
          <TextInput
            style={styles.textInput}
            numberOfLines={4}
            textAlignVertical="top"
            placeholder="share your views"
            placeholderTextColor={Colors.placeholder}
          />
          <AppRegularButton style={styles.shareBtn}>Share</AppRegularButton>
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;

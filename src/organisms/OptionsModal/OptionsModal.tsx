import {View, Text, Modal, Pressable} from 'react-native';
import React from 'react';
import {styles} from './OptionsModalStyles';
import AppText from '../../atoms/AppText/AppText';
import UserCircleIcon from '../../atoms/UserCircleIcon/UserCircleIcon';
import UnFollowIcon from '../../atoms/UnfollowIcon/UnfollowIcon';
import InfoIcon from '../../atoms/InfoIcon/InfoIcon';
import WarningIcon from '../../atoms/WarningIcon/WarningIcon';
import {Colors} from '../../utils/theme';

type OptionsModalProps = {
  visible: boolean;
  handleClose: () => void;
};
const OptionsModal: React.FC<OptionsModalProps> = ({visible, handleClose}) => {
  return (
    <Modal transparent visible={visible} animationType={'slide'}>
      <View style={styles.mainContainer}>
        <Pressable style={styles.pressable} onPress={handleClose} />
        <View style={styles.modalBody}>
          <View style={styles.gesture} />
          <View style={styles.content}>
            <View style={styles.section}>
              <UserCircleIcon />
              <AppText lineHeight={14} style={styles.info}>
                Account
              </AppText>
            </View>
            <View style={styles.section}>
              <InfoIcon />
              <AppText lineHeight={14} style={styles.info}>
                Why you are seeing this.
              </AppText>
            </View>
            <View style={styles.section}>
              <UnFollowIcon />
              <AppText lineHeight={14} style={styles.info}>
                Unfollow
              </AppText>
            </View>
            <View
              style={[
                styles.section,
                {
                  borderBottomWidth: 0,
                },
              ]}>
              <WarningIcon />
              <AppText
                lineHeight={14}
                style={[
                  styles.info,
                  {
                    color: Colors.error,
                  },
                ]}>
                Report
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OptionsModal;

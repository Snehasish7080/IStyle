import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import AppText from '../../atoms/AppText/AppText';
import {styles} from './BackHeaderWithActionStyles';

type BackHeaderWithActionProps = {
  onBack: () => void;
  title: string;
  actionTitle: string;
  onAction: () => void;
};

const BackHeaderWithAction: React.FC<BackHeaderWithActionProps> = ({
  onBack,
  title,
  actionTitle,
  onAction,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={1}
        onPress={onBack}
        hitSlop={{
          top: 20,
          bottom: 20,
          right: 20,
          left: 20,
        }}>
        <BackIcon />
      </TouchableOpacity>

      <AppText lineHeight={14} style={styles.headerText}>
        {title}
      </AppText>

      <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
        <AppText lineHeight={14} style={styles.actionText}>
          {actionTitle}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default BackHeaderWithAction;

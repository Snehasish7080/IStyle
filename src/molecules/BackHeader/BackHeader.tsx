import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './BackHeaderStyles';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import AppText from '../../atoms/AppText/AppText';

type BackHeaderProps = {
  onBack: () => void;
  title: string;
};
const BackHeader: React.FC<BackHeaderProps> = ({onBack, title}) => {
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
    </View>
  );
};

export default BackHeader;

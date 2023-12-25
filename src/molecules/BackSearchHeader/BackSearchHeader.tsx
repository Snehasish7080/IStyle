import {View, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {styles} from './BackSearchHeaderStyles';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import AppText from '../../atoms/AppText/AppText';

type BackSearchHeaderProps = {
  onBack: () => void;
  searchText: string;
  onPressSearch: () => void;
};

const BackSearchHeader: React.FC<BackSearchHeaderProps> = ({
  onBack,
  searchText,
  onPressSearch,
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
      <Pressable style={styles.searchBox} onPress={onPressSearch}>
        <AppText lineHeight={14} style={styles.search}>
          {searchText}
        </AppText>
      </Pressable>
    </View>
  );
};

export default BackSearchHeader;

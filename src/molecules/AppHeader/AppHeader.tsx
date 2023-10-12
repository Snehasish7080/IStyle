import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './AppHeaderStyles';
import MenuIcon from '../../atoms/MenuIcon/MenuIcon';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import ChatIcon from '../../atoms/ChatIcon/ChatIcon';
import AppText from '../../atoms/AppText/AppText';

const AppHeader = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftSection}>
        <MenuIcon />
        <AppText lineHeight={22} style={styles.logoTitle}>
          IStyle
        </AppText>
      </View>
      <View style={styles.rightSection}>
        <SearchIcon />
        <ChatIcon />
      </View>
    </View>
  );
};

export default AppHeader;

import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './AppHeaderStyles';
import MenuIcon from '../../atoms/MenuIcon/MenuIcon';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import ChatIcon from '../../atoms/ChatIcon/ChatIcon';
import AppText from '../../atoms/AppText/AppText';

type AppHeaderProps = {
  hideSearch?: boolean;
};
const AppHeader: React.FC<AppHeaderProps> = ({hideSearch = false}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftSection}>
        <MenuIcon />
        <AppText lineHeight={22} style={styles.logoTitle}>
          IStyle
        </AppText>
      </View>
      <View style={styles.rightSection}>
        {!hideSearch && <SearchIcon />}
        <TouchableOpacity style={{marginLeft: 25}}>
          <ChatIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;

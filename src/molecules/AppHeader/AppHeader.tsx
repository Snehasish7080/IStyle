import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './AppHeaderStyles';
import MenuIcon from '../../atoms/MenuIcon/MenuIcon';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import ChatIcon from '../../atoms/ChatIcon/ChatIcon';
import AppText from '../../atoms/AppText/AppText';
import SettingIcon from '../../atoms/SettingIcon/SettingIcon';

type AppHeaderProps = {
  hideSearch?: boolean;
  hideChat?: boolean;
  hideSetting?: boolean;
};
const AppHeader: React.FC<AppHeaderProps> = ({
  hideSearch = false,
  hideChat = false,
  hideSetting = true,
}) => {
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
        {!hideChat && (
          <TouchableOpacity style={{marginLeft: 25}}>
            <ChatIcon />
          </TouchableOpacity>
        )}
        {!hideSetting && <SettingIcon />}
      </View>
    </View>
  );
};

export default AppHeader;

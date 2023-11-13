import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AppText from '../../atoms/AppText/AppText';
import ChatIcon from '../../atoms/ChatIcon/ChatIcon';
import CreateIcon from '../../atoms/CreateIcon/CreateIcon';
import MenuIcon from '../../atoms/MenuIcon/MenuIcon';
import SettingIcon from '../../atoms/SettingIcon/SettingIcon';
import {ParentRouteList} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import {styles} from './AppHeaderStyles';

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
  const parentNavigation =
    useNavigation<NativeStackNavigationProp<ParentRouteList>>();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftSection}>
        <MenuIcon />
        <AppText lineHeight={22} style={styles.logoTitle}>
          IStyle
        </AppText>
      </View>

      <View style={styles.rightSection}>
        {!hideSearch && (
          <TouchableOpacity
            style={{marginLeft: 25}}
            onPress={() => {
              parentNavigation.navigate('MediaGalleryScreen');
            }}>
            <CreateIcon />
          </TouchableOpacity>
        )}
        {!hideChat && (
          <TouchableOpacity style={{marginLeft: 25}}>
            <ChatIcon />
          </TouchableOpacity>
        )}
        {!hideSetting && (
          <TouchableOpacity style={{marginLeft: 25}}>
            <SettingIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppHeader;

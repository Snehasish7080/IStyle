import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './HomeScreenStyles';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import AppText from '../../atoms/AppText/AppText';
import StyleCard from '../../molecules/StyleCard/StyleCard';

const HomeScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <AppHeader />
        <View style={styles.contentContainer}>
          <AppText lineHeight={18} style={styles.tagLine}>
            Ready to
          </AppText>
          <AppText lineHeight={18} style={styles.goTagLine}>
            Go
          </AppText>

          <StyleCard />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

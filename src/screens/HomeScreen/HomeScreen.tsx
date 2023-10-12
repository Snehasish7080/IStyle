import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './HomeScreenStyles';
import AppHeader from '../../molecules/AppHeader/AppHeader';

const HomeScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <AppHeader />
      </View>
    </View>
  );
};

export default HomeScreen;

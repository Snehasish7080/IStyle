import {View, Text, Image} from 'react-native';
import React from 'react';
import Container from '../../atoms/Container/Container';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import {styles} from './LeaderboardScreenStyles';
import {data} from '../../utils/dummyData';
import {scale} from 'react-native-size-matters';

const LeaderboardScreen = () => {
  return (
    <Container>
      <AppHeader hideSetting={true} hideChat={true} />

      <View style={styles.mainContainer}>
        <View style={styles.trendingContainer}>
          <Image
            source={{
              uri: data[0].image,
              width: scale(200),
              height: scale(200),
            }}
            style={styles.trendingImage}
          />
        </View>
      </View>
    </Container>
  );
};

export default LeaderboardScreen;

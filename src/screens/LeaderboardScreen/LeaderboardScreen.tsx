import {
  View,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from 'react-native';
import React from 'react';
import Container from '../../atoms/Container/Container';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import {styles} from './LeaderboardScreenStyles';
import {data} from '../../utils/dummyData';
import {scale, verticalScale} from 'react-native-size-matters';
import {useSharedValue} from 'react-native-reanimated';
import AnimatedCarauselItem from '../../molecules/AnimatedCarouselItem/AnimatedCarouselItem';
import AppText from '../../atoms/AppText/AppText';
import {
  Box,
  Canvas,
  LinearGradient,
  rect,
  rrect,
  vec,
} from '@shopify/react-native-skia';
import {Colors} from '../../utils/theme';

const LeaderboardScreen = () => {
  const scrollX = useSharedValue(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = e.nativeEvent.contentOffset.x;
  };

  return (
    <Container style={styles.mainContainer}>
      <AppHeader hideSetting={true} hideChat={true} />

      <View style={styles.mainContainer}>
        <View style={styles.trendingContainer}>
          <View style={[styles.trendingUser, {height: verticalScale(70)}]}>
            <Canvas
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
              }}
              mode="continuous">
              <Box
                box={rrect(rect(0, 0, scale(100), verticalScale(120)), 20, 20)}>
                <LinearGradient
                  start={vec(100, 0)}
                  end={vec(0, 100)}
                  colors={['#FDFEFE', '#FDFEFE']}
                />
              </Box>
            </Canvas>

            <Image
              source={{
                uri: data[0].image,
                width: scale(50),
                height: scale(50),
              }}
              style={styles.userProfile}
            />
          </View>

          <View style={styles.trendingUser}>
            <Canvas
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
              }}
              mode="continuous">
              <Box
                box={rrect(rect(0, 0, scale(100), verticalScale(120)), 20, 20)}>
                <LinearGradient
                  start={vec(100, 0)}
                  end={vec(0, 100)}
                  colors={['#FDFEFE', '#FDFEFE']}
                />
              </Box>
            </Canvas>

            <Image
              source={{
                uri: data[0].image,
                width: scale(50),
                height: scale(50),
              }}
              style={styles.userProfile}
            />
          </View>

          <View style={[styles.trendingUser, {height: verticalScale(80)}]}>
            <Canvas
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
              }}
              mode="continuous">
              <Box
                box={rrect(rect(0, 0, scale(100), verticalScale(120)), 20, 20)}>
                <LinearGradient
                  start={vec(100, 0)}
                  end={vec(0, 100)}
                  colors={['#FDFEFE', '#FDFEFE']}
                />
              </Box>
            </Canvas>

            <Image
              source={{
                uri: data[0].image,
                width: scale(50),
                height: scale(50),
              }}
              style={styles.userProfile}
            />
          </View>
        </View>

        <FlatList
          contentContainerStyle={{
            paddingHorizontal: scale(16),
            paddingVertical: verticalScale(16),
          }}
          horizontal
          data={data}
          keyExtractor={item => item.image}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          bounces={false}
          initialScrollIndex={data.length / 2}
          ItemSeparatorComponent={() => <View style={{width: scale(8)}} />}
          renderItem={({item, index}) => {
            return (
              <AnimatedCarauselItem
                image={item.image}
                index={index}
                scrollX={scrollX}
                dataLength={data.length}
              />
            );
          }}
        />
      </View>
    </Container>
  );
};

export default LeaderboardScreen;

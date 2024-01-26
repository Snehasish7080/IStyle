import {
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import Container from '../../atoms/Container/Container';
import {styles} from './LeaderboardScreenStyles';
import {useSharedValue} from 'react-native-reanimated';
import AppText from '../../atoms/AppText/AppText';
import {data} from '../../utils/dummyData';
import {scale, verticalScale} from 'react-native-size-matters';
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
    <Container>
      <View style={styles.header}>
        <AppText lineHeight={25} style={styles.heading}>
          Top Stylists
        </AppText>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: verticalScale(16),
            paddingBottom: verticalScale(100),
          }}
          scrollEventThrottle={16}
          bounces={false}
          data={data}
          keyExtractor={item => item.image}
          ItemSeparatorComponent={() => (
            <View style={{height: verticalScale(16)}} />
          )}
          renderItem={({item, index}) => {
            return (
              <View style={styles.leaderboaderCard} key={index}>
                <AppText lineHeight={14} style={styles.numbers}>
                  {index + 1}
                </AppText>
                <View style={styles.profileImageContainer}>
                  <Canvas
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      top: 0,
                    }}
                    mode="continuous">
                    <Box box={rrect(rect(0, 0, scale(54), scale(54)), 30, 30)}>
                      <LinearGradient
                        start={vec(100, 10)}
                        end={vec(0, 0)}
                        colors={[
                          Colors.topStylistSecondary,
                          Colors.topStylistPrimary,
                        ]}
                      />
                    </Box>
                  </Canvas>

                  <Image
                    source={{
                      uri: item.image,
                      width: 50,
                      height: 50,
                    }}
                    style={styles.profileImage}
                  />
                </View>
                <View style={styles.userContainer}>
                  <AppText lineHeight={14} style={styles.userName}>
                    @rahul56
                  </AppText>
                  <AppText lineHeight={14} style={styles.userFullName}>
                    rahul singh
                  </AppText>
                </View>
              </View>
            );
          }}
        />
      </View>
    </Container>
  );
};

export default LeaderboardScreen;

import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {scale, verticalScale} from 'react-native-size-matters';
import AppText from '../../atoms/AppText/AppText';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import ExploreCard from '../../molecules/ExploreCard/ExploreCard';
import MostTrendingCard from '../../molecules/MostTrendingCard/MostTrendingCard';
import {ExploreNavProps} from '../../navigations/ExploreNavigation/ExploreNavigationTypes';
import {data} from '../../utils/dummyData';
import {Colors} from '../../utils/theme';
import {styles} from './ExploreScreenStyles';
import SyncedScrollView from './SyncedScrollView';
import {SyncedScrollViewContext} from './SyncedScrollViewContext';

const tagList = [
  'Trending Now',
  'Casual',
  'Party',
  'Office',
  'Meeting',
  'Wedding',
  'Birthday',
];
const ExploreScreen: React.FC<ExploreNavProps<'ExploreScreen'>> = ({
  navigation,
}) => {
  const {width} = useWindowDimensions();
  const [selectedTag, setSelectedTag] = useState('Trending Now');
  const activeScrollView = useSharedValue('');
  const offsetPercent = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  const animatedSearch = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollY.value * -1,
        },
      ],
    };
  }, [scrollY]);
  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.container]}>
        <AppHeader hideChat={true} />
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 60,
              zIndex: 1,
              backgroundColor: Colors.white,
            },
            animatedSearch,
          ]}>
          <TouchableOpacity
            style={styles.searchBox}
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}>
            <SearchIcon color={Colors.placeholder} />
            <AppText lineHeight={14} style={styles.search}>
              Search
            </AppText>
          </TouchableOpacity>
          <View style={{width}}>
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <AppText lineHeight={18} style={styles.separatorText}>
                MOST TRENDING
              </AppText>
              <View style={styles.separator} />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: scale(16),
              }}>
              {data.slice(0, 4).map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginRight: scale(10),
                    }}>
                    <MostTrendingCard key={index} image={item.image} />
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <AppText lineHeight={18} style={styles.separatorText}>
                Explore
              </AppText>
              <View style={styles.separator} />
            </View>
          </View>
        </Animated.View>
        <SyncedScrollViewContext.Provider
          value={{
            activeScrollView,
            offsetPercent,
            scrollY,
            prevScrollY,
          }}>
          <View style={styles.listContainer}>
            <SyncedScrollView
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <ExploreCard
                    id={index.toString() + 'first'}
                    image={item.image}
                    isSmall={index % 2 === 0}
                    onPress={() => {
                      navigation.navigate('StyleViewScreen', {
                        image: item.image,
                        key: index.toString() + 'first',
                      });
                    }}
                    allowDummy={true}
                  />
                );
              }}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              contentContainerStyle={{
                paddingRight: 5,
                paddingBottom: verticalScale(200),
                paddingTop: verticalScale(300),
              }}
              id={'first'}
              showsVerticalScrollIndicator={false}
              directionalLockEnabled={true}
              scrollEventThrottle={16}
              decelerationRate={'fast'}
            />
            <SyncedScrollView
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <ExploreCard
                    id={index.toString() + 'second'}
                    image={item.image}
                    isSmall={index % 2 !== 0}
                    onPress={() => {
                      navigation.navigate('StyleViewScreen', {
                        image: item.image,
                        key: index.toString() + 'second',
                      });
                    }}
                    allowDummy={true}
                  />
                );
              }}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              contentContainerStyle={{
                paddingLeft: 5,
                paddingBottom: verticalScale(200),
                paddingTop: verticalScale(300),
              }}
              id={'second'}
              showsVerticalScrollIndicator={false}
              directionalLockEnabled={true}
              scrollEventThrottle={16}
              decelerationRate={'fast'}
            />
          </View>
        </SyncedScrollViewContext.Provider>
      </Animated.View>
    </View>
  );
};

export default ExploreScreen;

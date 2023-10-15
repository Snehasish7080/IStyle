import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  NativeScrollEvent,
  ScrollView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {styles} from './ExploreScreenStyles';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import AppText from '../../atoms/AppText/AppText';
import StyleCard from '../../molecules/StyleCard/StyleCard';
import {data} from '../../utils/dummyData';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MainContext} from '../../../App';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import {Colors} from '../../utils/theme';
import ExploreCard from '../../molecules/ExploreCard/ExploreCard';
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
const ExploreScreen = () => {
  const [selectedTag, setSelectedTag] = useState('Trending Now');
  const activeScrollView = useSharedValue('');
  const offsetPercent = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  const {height} = useWindowDimensions();
  const {isScrolling} = useContext(MainContext);
  const previousScrollValue = useSharedValue(0);

  const onScroll = (e: NativeScrollEvent) => {
    if (e.contentOffset.y < previousScrollValue.value) {
      if (isScrolling) {
        isScrolling.value = 0;
      }
    } else if (e.contentOffset.y > previousScrollValue.value) {
      if (isScrolling) {
        isScrolling.value = 1;
      }
    }
    if (e.contentOffset.y > 0) {
      previousScrollValue.value = Math.max(e.contentOffset.y, 0);
    } else {
      previousScrollValue.value = 0;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: Boolean(isScrolling?.value)
        ? withTiming(height - 10)
        : withTiming(height - 72),
    };
  }, [isScrolling]);

  const animatedSearch = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollY.value * -1,
        },
      ],
    };
  }, [isScrolling]);
  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <AppHeader hideSearch={true} />
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
          <TouchableOpacity style={styles.searchBox}>
            <SearchIcon color={Colors.placeholder} />
            <AppText lineHeight={14} style={styles.search}>
              Search
            </AppText>
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
            directionalLockEnabled={true}>
            {tagList.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.tag,
                    {
                      backgroundColor:
                        item === selectedTag ? Colors.dark : Colors.white,
                    },
                  ]}
                  key={index}
                  onPress={() => setSelectedTag(item)}>
                  <AppText
                    lineHeight={14}
                    style={[
                      styles.tagText,
                      {
                        color:
                          item === selectedTag ? Colors.white : Colors.dark,
                      },
                    ]}>
                    {item}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>
        <SyncedScrollViewContext.Provider
          value={{
            activeScrollView,
            offsetPercent,
            scrollY,
            prevScrollY,
            previousScrollValue,
          }}>
          <View style={styles.listContainer}>
            <SyncedScrollView
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <ExploreCard image={item.image} isSmall={index % 2 === 0} />
                );
              }}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              contentContainerStyle={{
                paddingRight: 5,
                paddingBottom: 200,
                paddingTop: 120,
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
                  <ExploreCard image={item.image} isSmall={index % 2 !== 0} />
                );
              }}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              contentContainerStyle={{
                paddingLeft: 5,
                paddingBottom: 200,
                paddingTop: 120,
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

import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import AppText from '../../atoms/AppText/AppText';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import ExploreCard from '../../molecules/ExploreCard/ExploreCard';
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
  const [selectedTag, setSelectedTag] = useState('Trending Now');
  const activeScrollView = useSharedValue('');
  const offsetPercent = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  const previousScrollValue = useSharedValue(0);

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
                  />
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
                  />
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

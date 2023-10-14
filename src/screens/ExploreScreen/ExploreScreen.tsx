import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
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

const ExploreScreen = () => {
  const {height} = useWindowDimensions();
  const {isScrolling} = useContext(MainContext);
  const previousScrollValue = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
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
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: Boolean(isScrolling?.value)
        ? withTiming(height - 10)
        : withTiming(height - 72),
    };
  }, [isScrolling]);
  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <AppHeader hideSearch={true} />

        <Animated.FlatList
          ListHeaderComponent={
            <TouchableOpacity style={styles.searchBox}>
              <SearchIcon color={Colors.placeholder} />
              <AppText lineHeight={14} style={styles.search}>
                Search
              </AppText>
            </TouchableOpacity>
          }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return <ExploreCard image={item.image} index={index} />;
          }}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default ExploreScreen;

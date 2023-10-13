import {View, Text, FlatList} from 'react-native';
import React, {useContext} from 'react';
import {styles} from './HomeScreenStyles';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import AppText from '../../atoms/AppText/AppText';
import StyleCard from '../../molecules/StyleCard/StyleCard';
import {data} from '../../utils/dummyData';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {MainContext} from '../../../App';

const HomeScreen = () => {
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
      previousScrollValue.value = Math.max(e.contentOffset.y, 0);
    },
    onEndDrag: e => {
      previousScrollValue.value = Math.max(e.contentOffset.y, 0);
    },
  });
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <AppHeader />
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.tagLineContainer}>
              <AppText lineHeight={18} style={styles.tagLine}>
                Ready to
              </AppText>
              <AppText lineHeight={18} style={styles.goTagLine}>
                Go
              </AppText>
            </View>
          }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return <StyleCard image={item.image} links={item.links} />;
          }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 80,
            paddingHorizontal: 20,
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 20,
              }}
            />
          )}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

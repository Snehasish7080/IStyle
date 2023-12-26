import React, {useContext} from 'react';
import {FlatListProps} from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {SyncedScrollViewContext} from './SyncedScrollViewContext';

interface SyncedScrollViewProps<T> extends FlatListProps<T> {
  id: string;
}
const SyncedScrollView = <T,>({
  id,

  ...props
}: SyncedScrollViewProps<T>) => {
  const {activeScrollView, offsetPercent, scrollY, prevScrollY} = useContext(
    SyncedScrollViewContext,
  );

  const scrollViewLength = useSharedValue(0);
  const contentLength = useSharedValue(0);
  const scrollableLength = useSharedValue(0);

  useDerivedValue(() => {
    scrollableLength.value = contentLength.value - scrollViewLength.value;
  }, [scrollViewLength, contentLength]);

  const flatlistRef = useAnimatedRef<Animated.FlatList<T>>();

  const handleScroll = useAnimatedScrollHandler(e => {
    if (activeScrollView && offsetPercent && scrollY && prevScrollY) {
      if (id === activeScrollView.value && scrollableLength.value > 0) {
        offsetPercent.value = e.contentOffset.y;
        scrollY.value = e.contentOffset.y;
        prevScrollY.value = e.contentOffset.y;
      }
    }
  }, []);

  const handleTouchStart = () => {
    if (activeScrollView) {
      activeScrollView.value = id;
    }
  };

  useDerivedValue(() => {
    if (activeScrollView && offsetPercent) {
      if (id !== activeScrollView.value && scrollableLength.value > 0) {
        scrollTo(flatlistRef, 0, offsetPercent.value, false);
      }
    }
  });

  return (
    <Animated.FlatList
      {...props}
      ref={flatlistRef as any}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onTouchStart={handleTouchStart}
      onLayout={e => {
        scrollViewLength.value = e.nativeEvent.layout.height;
      }}
      onContentSizeChange={(width, height) => {
        contentLength.value = height;
      }}
    />
  );
};

export default SyncedScrollView;

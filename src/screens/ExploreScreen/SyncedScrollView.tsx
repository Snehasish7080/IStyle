import {FlatListProps, NativeScrollEvent} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SyncedScrollViewContext} from './SyncedScrollViewContext';
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {MainContext} from '../../../App';

interface SyncedScrollViewProps<T> extends FlatListProps<T> {
  id: string;
}
const SyncedScrollView = <T,>({
  id,

  ...props
}: SyncedScrollViewProps<T>) => {
  const {
    activeScrollView,
    offsetPercent,
    scrollY,
    prevScrollY,
    previousScrollValue,
  } = useContext(SyncedScrollViewContext);

  const {isScrolling} = useContext(MainContext);

  const scrollViewLength = useSharedValue(0);
  const contentLength = useSharedValue(0);
  const scrollableLength = useSharedValue(0);

  useDerivedValue(() => {
    scrollableLength.value = contentLength.value - scrollViewLength.value;
  }, [scrollViewLength, contentLength]);

  const flatlistRef = useAnimatedRef<Animated.FlatList<T>>();

  const handleScroll = useAnimatedScrollHandler(e => {
    if (
      activeScrollView &&
      offsetPercent &&
      scrollY &&
      prevScrollY &&
      previousScrollValue
    ) {
      if (id === activeScrollView.value && scrollableLength.value > 0) {
        offsetPercent.value = e.contentOffset.y;
        scrollY.value = e.contentOffset.y;
        prevScrollY.value = e.contentOffset.y;

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

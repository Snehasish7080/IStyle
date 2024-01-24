import {useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import {styles} from './AnimatedCarauselItemStyles';

type AnimatedCarauselItemProps = {
  image: string;
  index: number;
  scrollX: SharedValue<number>;
  dataLength: number;
};
const AnimatedCarauselItem: React.FC<AnimatedCarauselItemProps> = ({
  scrollX,
  image,
  index,
  dataLength,
}) => {
  const {width} = useWindowDimensions();

  const LARGE_IMAGE_WIDTH = width * 0.5;
  const MEDIUM_IMAGE_WIDTH = LARGE_IMAGE_WIDTH * 0.5;
  const SMALL_IMAGE_WIDTH = MEDIUM_IMAGE_WIDTH * 0.5;

  const inputRange = [
    (index - 2) * SMALL_IMAGE_WIDTH,
    (index - 1) * SMALL_IMAGE_WIDTH,
    index * SMALL_IMAGE_WIDTH,
    (index + 1) * SMALL_IMAGE_WIDTH,
  ];

  const isLast = dataLength - 1 === index;
  const secondLast = dataLength - 2 === index;

  const secondLastOutputRange = [
    SMALL_IMAGE_WIDTH,
    MEDIUM_IMAGE_WIDTH,
    MEDIUM_IMAGE_WIDTH,
    SMALL_IMAGE_WIDTH,
  ];

  const lastOutputRange = [
    SMALL_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
    SMALL_IMAGE_WIDTH,
  ];

  const outputRange = [
    SMALL_IMAGE_WIDTH,
    MEDIUM_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
    SMALL_IMAGE_WIDTH,
  ];

  const getOutputRange = () => {
    if (isLast) {
      return lastOutputRange;
    }

    if (secondLast) {
      return secondLastOutputRange;
    }

    return outputRange;
  };

  const finalOutputRange = getOutputRange();
  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(
      scrollX.value,
      inputRange,
      finalOutputRange,
      Extrapolate.CLAMP,
    ),
  }));

  return (
    <Animated.Image
      source={{
        uri: image,
        width: scale(200),
        height: scale(200),
      }}
      style={[styles.trendingImage, animatedStyle]}
    />
  );
};

export default AnimatedCarauselItem;

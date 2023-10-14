import {View, Text, TouchableOpacity, Image, PixelRatio} from 'react-native';
import React from 'react';
import {styles} from './ExploreCardStyles';
import {horizontalScale} from '../../utils/scale';

type ExploreCardProps = {
  image: string;
  index: number;
};
const ExploreCard: React.FC<ExploreCardProps> = ({image, index}) => {
  const height = index === 1 ? horizontalScale(250) : horizontalScale(250);
  return (
    <TouchableOpacity activeOpacity={1}>
      <Image
        source={{
          uri: image,
          width: PixelRatio.getPixelSizeForLayoutSize(150),
          height: PixelRatio.getPixelSizeForLayoutSize(250),
        }}
        style={[styles.image, {height}]}
      />
    </TouchableOpacity>
  );
};

export default ExploreCard;

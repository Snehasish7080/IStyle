import React from 'react';
import {Image, PixelRatio, TouchableOpacity} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {styles} from './ExploreCardStyles';
import {S3_BUCKET_URL} from '@env';

type ExploreCardProps = {
  image: string;
  isSmall: boolean;
  onPress: () => void;
  id: string;
};
const ExploreCard: React.FC<ExploreCardProps> = ({
  image,
  isSmall,
  onPress,
  id,
}) => {
  const height = isSmall ? horizontalScale(150) : horizontalScale(250);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{position: 'relative'}}
      onPress={onPress}>
      <Image
        source={{
          uri: `${S3_BUCKET_URL}/${image}`,
          width: PixelRatio.getPixelSizeForLayoutSize(150),
          height: height,
        }}
        style={[styles.image, {height}]}
      />
    </TouchableOpacity>
  );
};

export default ExploreCard;

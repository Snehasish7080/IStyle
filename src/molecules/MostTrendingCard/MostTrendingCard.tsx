import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './MostTrendingCardStyles';
import AppText from '../../atoms/AppText/AppText';

type MostTrendingCardProps = {
  image: string;
};
const MostTrendingCard: React.FC<MostTrendingCardProps> = ({image}) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={{
          uri: image,
          width: 100,
          height: 150,
        }}
        style={styles.image}
      />
      <View style={styles.userContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: image,
              width: 30,
              height: 30,
            }}
            style={styles.profile}
          />
        </View>
        <AppText lineHeight={14} style={styles.userName}>
          @rahul904
        </AppText>
      </View>
    </View>
  );
};

export default MostTrendingCard;

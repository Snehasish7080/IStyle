import {
  View,
  Text,
  Image,
  PixelRatio,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {styles} from './StyleCardStyles';
import {horizontalScale} from '../../utils/scale';
import AppText from '../../atoms/AppText/AppText';
import HeartIcon from '../../atoms/HeartIcon/HeartIcon';
import CommentIcon from '../../atoms/CommentIcon/CommentIcon';
import ShareIcon from '../../atoms/ShareIcon/ShareIcon';

const StyleCard = () => {
  const width = horizontalScale(320);
  const height = horizontalScale(320);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1675253290701-a7b7b2c6c9f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fG91dGZpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
              width: PixelRatio.getPixelSizeForLayoutSize(30),
              height: PixelRatio.getPixelSizeForLayoutSize(30),
            }}
            style={styles.profileImage}
          />
          <AppText lineHeight={14} style={styles.userName}>
            Laura Chouette
          </AppText>
        </View>
        <TouchableOpacity style={styles.followBtn}>
          <AppText lineHeight={14} style={styles.userName}>
            Follow
          </AppText>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={{
          uri: `https://images.unsplash.com/photo-1603217041431-9a99375beab0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80`,
          width: PixelRatio.getPixelSizeForLayoutSize(width),
          height: PixelRatio.getPixelSizeForLayoutSize(height),
        }}
        style={styles.image}
        borderRadius={20}
        width={width}
        height={height}
        resizeMode="cover">
        <View style={styles.iconCountContainer}>
          <View style={styles.icon}>
            <HeartIcon />
          </View>
          <AppText lineHeight={14} style={styles.count}>
            1.1k
          </AppText>
        </View>
        <View style={styles.iconCountContainer}>
          <View style={styles.icon}>
            <CommentIcon />
          </View>
          <AppText lineHeight={14} style={styles.count}>
            1.1k
          </AppText>
        </View>
        <View style={styles.iconCountContainer}>
          <View style={styles.icon}>
            <ShareIcon />
          </View>
          <AppText lineHeight={14} style={styles.count}>
            1.1k
          </AppText>
        </View>
      </ImageBackground>
      <ScrollView horizontal contentContainerStyle={{paddingVertical: 10}}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
            width: PixelRatio.getPixelSizeForLayoutSize(50),
            height: PixelRatio.getPixelSizeForLayoutSize(50),
          }}
          style={styles.link}
        />
        <Image
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1665664652383-2308d742943c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
            width: PixelRatio.getPixelSizeForLayoutSize(50),
            height: PixelRatio.getPixelSizeForLayoutSize(50),
          }}
          style={styles.link}
        />
      </ScrollView>
    </View>
  );
};

export default StyleCard;

import React from 'react';
import {
  Image,
  ImageBackground,
  PixelRatio,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AppText from '../../atoms/AppText/AppText';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import CommentIcon from '../../atoms/CommentIcon/CommentIcon';
import HeartIcon from '../../atoms/HeartIcon/HeartIcon';
import ShareIcon from '../../atoms/ShareIcon/ShareIcon';
import {ExploreNavProps} from '../../navigations/ExploreNavigation/ExploreNavigationTypes';
import {data} from '../../utils/dummyData';
import {styles} from './StyleViewScreenStyles';

const StyleViewScreen: React.FC<ExploreNavProps<'StyleViewScreen'>> = ({
  navigation,
  route,
}) => {
  const {height, width} = useWindowDimensions();
  const {image, key} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={1}
          onPress={() => {
            navigation.goBack();
          }}
          hitSlop={{
            top: 10,
            bottom: 10,
            right: 10,
            left: 10,
          }}>
          <BackIcon />
        </TouchableOpacity>
        <ImageBackground
          source={{
            uri: image,
            height: PixelRatio.getPixelSizeForLayoutSize(height - 72),
            width: PixelRatio.getPixelSizeForLayoutSize(width - 4),
          }}
          style={styles.image}
          resizeMode="cover">
          <View
            style={{
              maxHeight: 320,
              marginLeft: 20,
              marginBottom: 20,
              borderRadius: 20,
              width: 80,
              backgroundColor: 'white',
              overflow: 'hidden',
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              {data[0].links?.map((item, index) => {
                return (
                  <Image
                    source={{
                      uri: item.image,
                      width: PixelRatio.getPixelSizeForLayoutSize(50),
                      height: PixelRatio.getPixelSizeForLayoutSize(50),
                    }}
                    style={styles.link}
                    key={index}
                  />
                );
              })}
              {data[0].links?.map((item, index) => {
                return (
                  <Image
                    source={{
                      uri: item.image,
                      width: PixelRatio.getPixelSizeForLayoutSize(50),
                      height: PixelRatio.getPixelSizeForLayoutSize(50),
                    }}
                    style={styles.link}
                    key={index}
                  />
                );
              })}
              {data[0].links?.map((item, index) => {
                return (
                  <Image
                    source={{
                      uri: item.image,
                      width: PixelRatio.getPixelSizeForLayoutSize(50),
                      height: PixelRatio.getPixelSizeForLayoutSize(50),
                    }}
                    style={styles.link}
                    key={index}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.actionContainer}>
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
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default StyleViewScreen;

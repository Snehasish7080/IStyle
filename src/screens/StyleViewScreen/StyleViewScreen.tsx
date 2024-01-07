import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  PixelRatio,
  Pressable,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Vibration,
  View,
} from 'react-native';
import AppText from '../../atoms/AppText/AppText';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import ShareIcon from '../../atoms/ShareIcon/ShareIcon';
import TrendIcon from '../../atoms/TrendIcon/TrendIcon';
import {ExploreNavProps} from '../../navigations/ExploreNavigation/ExploreNavigationTypes';
import {styles} from './StyleViewScreenStyles';
import {S3_BUCKET_URL} from '@env';
import {
  useMarkTrendMutation,
  useUnmarkTrendMutation,
} from '../../feature/services/style';

const StyleViewScreen: React.FC<ExploreNavProps<'StyleViewScreen'>> = ({
  navigation,
  route,
}) => {
  const {height, width} = useWindowDimensions();
  const {style} = route.params;
  const [markTrend, setMarkTrend] = useState(style.isMarked);
  const [markTrendMutation] = useMarkTrendMutation();
  const [unMarkTrendMutation] = useUnmarkTrendMutation();
  const [trendCount, setTrendCount] = useState(style.trendCount);

  const handleMarkTrend = (value: boolean) => {
    Vibration.vibrate(1);
    setMarkTrend(value);
    if (value) {
      markTrendMutation({
        id: style.id,
      });
      setTrendCount(() => trendCount + 1);
    } else {
      unMarkTrendMutation({
        id: style.id,
      });
      setTrendCount(() => trendCount - 1);
    }
  };

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
            uri: `${S3_BUCKET_URL}/${style.image}`,
            height: PixelRatio.getPixelSizeForLayoutSize(height - 72),
            width: PixelRatio.getPixelSizeForLayoutSize(width - 4),
          }}
          style={styles.image}
          resizeMode="cover">
          <View
            style={{
              height: 80 * (style.links?.length || 0),
              maxHeight: 220,
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
              {style.links?.map((item, index) => {
                return (
                  <Image
                    source={{
                      uri: `${S3_BUCKET_URL}/${item.image}`,
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
              <Pressable
                style={styles.icon}
                onPress={() => {
                  handleMarkTrend(!style.isMarked);
                }}>
                <TrendIcon isMarked={markTrend} />
              </Pressable>
              <AppText lineHeight={14} style={styles.count}>
                {trendCount || 0}
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

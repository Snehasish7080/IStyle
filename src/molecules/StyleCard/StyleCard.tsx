import {
  View,
  Image,
  PixelRatio,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Vibration,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './StyleCardStyles';
import {horizontalScale} from '../../utils/scale';
import AppText from '../../atoms/AppText/AppText';
import ShareIcon from '../../atoms/ShareIcon/ShareIcon';
import TrendIcon from '../../atoms/TrendIcon/TrendIcon';
import {S3_BUCKET_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParentRouteList} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import {
  useMarkTrendMutation,
  useUnmarkTrendMutation,
} from '../../feature/services/style';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../feature/services/user';
import {useAppDispatch} from '../../feature/hooks';
import {
  setFeedOnFollow,
  setFeedOnUnFollow,
} from '../../feature/slice/feedSlice';

type StyleCardProps = {
  id: string;
  image: string;
  links: {id: string; image: string; url: string}[];
  user: {
    userName: string;
    profilePic: string;
    isFollowing: boolean;
  };
  isMarked: boolean;
  trendCount: number;
  created_at: string;
};
const StyleCard: React.FC<StyleCardProps> = ({
  image,
  links,
  user,
  id,
  isMarked,
  trendCount,
  created_at,
}) => {
  const width = horizontalScale(320);
  const height = horizontalScale(320);
  const parentNavigation =
    useNavigation<NativeStackNavigationProp<ParentRouteList>>();

  const [markTrendMutation] = useMarkTrendMutation();
  const [unMarkTrendMutation] = useUnmarkTrendMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const [follow, setFollow] = useState(user.isFollowing);
  const [markTrend, setMarkTrend] = useState(isMarked);

  const dispatch = useAppDispatch();

  const handleMarkTrend = (value: boolean) => {
    Vibration.vibrate(1);
    setMarkTrend(value);
    if (value) {
      markTrendMutation({
        id: id,
      });
    } else {
      unMarkTrendMutation({
        id: id,
      });
    }
  };

  const handleFollowUser = (value: boolean) => {
    setFollow(value);
    if (value) {
      followUser({
        userName: user.userName,
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            // onFollowUser(user.userName);
            dispatch(
              setFeedOnFollow({
                userName: user.userName,
              }),
            );
          }
        })
        .catch(e => console.log(e));
    } else {
      unfollowUser({
        userName: user.userName,
      })
        .unwrap()
        .then(res => {
          if (res.success) {
            dispatch(
              setFeedOnUnFollow({
                userName: user.userName,
              }),
            );
          }
        })
        .catch(e => console.log(e));
    }
  };

  useEffect(() => {
    setFollow(user.isFollowing);
  }, [user.isFollowing]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity
            onPress={() => {
              parentNavigation.push('CreatorProfileScreen', {
                userName: user.userName,
              });
            }}>
            <Image
              source={{
                uri: `${S3_BUCKET_URL}/${user.profilePic}`,
                width: PixelRatio.getPixelSizeForLayoutSize(30),
                height: PixelRatio.getPixelSizeForLayoutSize(30),
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              parentNavigation.push('CreatorProfileScreen', {
                userName: user.userName,
              });
            }}>
            <AppText lineHeight={14} style={styles.userName}>
              {user.userName}
            </AppText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.followBtn}
          onPress={() => {
            handleFollowUser(!follow);
          }}>
          <AppText lineHeight={14} style={styles.userName}>
            {follow ? 'Following' : 'Follow'}
          </AppText>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={{
          uri: `${S3_BUCKET_URL}/${image}`,
          width: PixelRatio.getPixelSizeForLayoutSize(width),
          height: PixelRatio.getPixelSizeForLayoutSize(height),
        }}
        style={styles.image}
        borderRadius={20}
        width={width}
        height={height}
        resizeMode="cover">
        <View style={styles.iconCountContainer}>
          <Pressable
            style={styles.icon}
            onPress={() => handleMarkTrend(!markTrend)}>
            <TrendIcon isMarked={markTrend} />
          </Pressable>
          <AppText lineHeight={14} style={styles.count}>
            {trendCount}
          </AppText>
        </View>
        {/* <View style={styles.iconCountContainer}> */}
        {/*   <View style={styles.icon}> */}
        {/*     <CommentIcon /> */}
        {/*   </View> */}
        {/*   <AppText lineHeight={14} style={styles.count}> */}
        {/*     1.1k */}
        {/*   </AppText> */}
        {/* </View> */}
        <View style={styles.iconCountContainer}>
          <View style={styles.icon}>
            <ShareIcon />
          </View>
          <AppText lineHeight={14} style={styles.count}>
            1.1k
          </AppText>
        </View>
      </ImageBackground>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingVertical: 10}}
        showsHorizontalScrollIndicator={false}>
        {links?.map((item, index) => {
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
  );
};

export default StyleCard;

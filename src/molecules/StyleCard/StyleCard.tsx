import {
  View,
  Image,
  PixelRatio,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Vibration,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './StyleCardStyles';
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
import {scale} from 'react-native-size-matters';
import OptionsIcon from '../../atoms/OptionsIcon/OptionsIcon';
import OptionsModal from '../../organisms/OptionsModal/OptionsModal';

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
  const parentNavigation =
    useNavigation<NativeStackNavigationProp<ParentRouteList>>();

  const [markTrendMutation] = useMarkTrendMutation();
  const [unMarkTrendMutation] = useUnmarkTrendMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const [follow, setFollow] = useState(user.isFollowing);
  const [markTrend, setMarkTrend] = useState(isMarked);
  const [showOptions, setShowOptions] = useState(false);

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
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.followBtn}
            onPress={() => {
              handleFollowUser(!follow);
            }}>
            <AppText lineHeight={14} style={styles.userName}>
              {follow ? 'Following' : 'Follow'}
            </AppText>
          </TouchableOpacity>
          <Pressable
            style={styles.optionBtn}
            onPress={() => {
              setShowOptions(true);
            }}>
            <OptionsIcon />
          </Pressable>
        </View>
      </View>
      <Image
        source={{
          uri: `${S3_BUCKET_URL}/${image}`,
          width: PixelRatio.getPixelSizeForLayoutSize(320),
          height: PixelRatio.getPixelSizeForLayoutSize(280),
        }}
        style={styles.image}
        borderRadius={20}
      />
      <View style={styles.actionContainer}>
        <Pressable
          style={styles.icon}
          onPress={() => handleMarkTrend(!markTrend)}>
          <TrendIcon isMarked={markTrend} />
        </Pressable>
        <View style={[styles.icon, {marginLeft: scale(16)}]}>
          <ShareIcon />
        </View>
      </View>
      <View style={styles.linkContainer}>
        <View style={styles.countContainer}>
          <AppText lineHeight={11} style={styles.trendCount}>
            {trendCount} marked trend
          </AppText>
          <AppText lineHeight={11} style={styles.bullet}>
            •
          </AppText>
          <AppText lineHeight={11} style={styles.trendCount}>
            10 share
          </AppText>
        </View>
        {links?.length > 0 && (
          <View style={styles.linkScrollView}>
            <ScrollView
              horizontal
              contentContainerStyle={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
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
        )}
      </View>
      <OptionsModal
        visible={showOptions}
        handleClose={() => {
          setShowOptions(false);
        }}
      />
    </View>
  );
};

export default StyleCard;

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
import {S3_BUCKET_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParentRouteList} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import {
  useClickStyleMutation,
  useLazyGetStyleByIdQuery,
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
import HeartIcon from '../../atoms/HeartIcon/HeartIcon';
import moment from 'moment';
import CommentIcon from '../../atoms/CommentIcon/CommentIcon';
import CommentModal from '../CommentModal/CommentModal';
import LikedUserModal from '../../organisms/LinkedUserModal/LikedUserModal';

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
  const [clickedStyle] = useClickStyleMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [getStyleById] = useLazyGetStyleByIdQuery();

  const [follow, setFollow] = useState(user.isFollowing);
  const [markTrend, setMarkTrend] = useState(isMarked);
  const [showOptions, setShowOptions] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showLikedusers, setShowLikedUsers] = useState(false);

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
          <View>
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
            <AppText lineHeight={12} style={styles.createdAt}>
              {moment(created_at).fromNow()}
            </AppText>
          </View>
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
      <Pressable
        onPress={() => {
          try {
            getStyleById(id).then(res => {
              if (res.data?.success) {
                clickedStyle({
                  id,
                });
                parentNavigation.navigate('StyleViewScreen', {
                  style: {
                    id: res.data?.data?.id,
                    image: res.data?.data?.image,
                    links: res.data?.data?.links,
                    trendCount: res.data?.data?.trendCount,
                    isMarked: res?.data?.data?.isMarked,
                  },
                });
              }
            });
          } catch (error) {
            console.log(error);
          }
        }}>
        <Image
          source={{
            uri: `${S3_BUCKET_URL}/${image}`,
            width: PixelRatio.getPixelSizeForLayoutSize(320),
            height: PixelRatio.getPixelSizeForLayoutSize(280),
          }}
          style={styles.image}
          borderRadius={20}
        />
      </Pressable>
      <View style={styles.actionContainer}>
        <Pressable
          style={styles.icon}
          onPress={() => handleMarkTrend(!markTrend)}>
          <HeartIcon isMarked={markTrend} />
        </Pressable>
        <Pressable
          style={[styles.icon, {marginLeft: scale(16)}]}
          onPress={() => {
            setShowAddComment(true);
          }}>
          <CommentIcon />
        </Pressable>
        <View style={[styles.icon, {marginLeft: scale(16)}]}>
          <ShareIcon />
        </View>
      </View>
      <View style={styles.linkContainer}>
        <View style={styles.countContainer}>
          <Pressable onPress={() => setShowLikedUsers(true)}>
            <AppText lineHeight={11} style={styles.trendCount}>
              {trendCount} {trendCount === 1 ? 'like' : 'likes'}
            </AppText>
          </Pressable>
          <AppText lineHeight={11} style={styles.bullet}>
            •
          </AppText>
          <AppText lineHeight={11} style={styles.trendCount}>
            {trendCount} {trendCount === 1 ? 'comment' : 'comments'}
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
                  <Pressable
                    key={index}
                    onPress={() => {
                      console.log('clicked');
                    }}>
                    <Image
                      source={{
                        uri: `${S3_BUCKET_URL}/${item.image}`,
                        width: PixelRatio.getPixelSizeForLayoutSize(50),
                        height: PixelRatio.getPixelSizeForLayoutSize(50),
                      }}
                      style={styles.link}
                    />
                  </Pressable>
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
      <CommentModal
        visible={showAddComment}
        handleClose={() => {
          setShowAddComment(false);
        }}
      />
      <LikedUserModal
        visible={showLikedusers}
        handleClose={() => {
          setShowLikedUsers(false);
        }}
      />
    </View>
  );
};

export default StyleCard;

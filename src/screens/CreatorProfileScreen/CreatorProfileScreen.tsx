import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ParentNavProps} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import Container from '../../atoms/Container/Container';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import ProfileIcon from '../../atoms/ProfileIcon/ProfileIcon';
import AppText from '../../atoms/AppText/AppText';
import {styles} from './CreatorProfileScreenStyles';
import {S3_BUCKET_URL} from '@env';
import {
  useFollowUserMutation,
  useGetUserByUserNameQuery,
  useUnfollowUserMutation,
} from '../../feature/services/user';
import {Colors} from '../../utils/theme';
import TrendIcon from '../../atoms/TrendIcon/TrendIcon';
import {horizontalScale} from '../../utils/scale';
import {data as dummyData} from '../../utils/dummyData';
import {IStyle} from '../../interface/styleInterface';
import {
  useGetUserStylesByUserNameQuery,
  useLazyGetUserStylesByUserNameQuery,
} from '../../feature/services/style';

const CreatorProfileScreen: React.FC<
  ParentNavProps<'CreatorProfileScreen'>
> = ({route, navigation}) => {
  const {userName, onFollowUser, onUnFollowUser} = route.params;
  const [isScrollStart, setIsScrollStart] = useState(false);
  const [userStyles, setUserStyles] = useState<IStyle[]>([]);
  const [follow, setFollow] = useState<boolean>(false);
  const {data, isLoading} = useGetUserByUserNameQuery(userName);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const [getUserStylesBuUserName] = useLazyGetUserStylesByUserNameQuery();

  useEffect(() => {
    getUserStylesBuUserName({
      userName,
    }).then(res => {
      if (res?.data?.success) {
        setUserStyles(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof data?.data?.isFollowing !== 'undefined') {
      setFollow(data?.data?.isFollowing);
    }
  }, [data?.data?.isFollowing]);

  const handleFollowUser = (value: boolean) => {
    if (typeof data?.data?.isFollowing !== 'undefined') {
      setFollow(value);
      if (value) {
        followUser({
          userName: data?.data?.userName,
        })
          .unwrap()
          .then(res => {
            if (res.success) {
              onFollowUser(data?.data?.userName);
            }
          })
          .catch(e => console.log(e));
      } else {
        unfollowUser({
          userName: data?.data?.userName,
        })
          .unwrap()
          .then(res => {
            if (res.success) {
              onUnFollowUser(data?.data?.userName);
            }
          })
          .catch(e => console.log(e));
      }
    }
  };

  return (
    <Container style={styles.container}>
      <AppHeader hideSetting={false} hideChat={true} />
      <View style={styles.mainContainer}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={styles.profileContainer}>
                {!Boolean(data?.data?.profilePic) && (
                  <View
                    style={{
                      ...styles.profileImage,
                      borderWidth: 1,
                      borderColor: Colors.dark,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ProfileIcon color={Colors.dark} />
                  </View>
                )}
                {Boolean(data?.data?.profilePic) && (
                  <Image
                    source={{
                      uri: `${S3_BUCKET_URL}/${data?.data?.profilePic}`,
                      width: 100,
                      height: 100,
                    }}
                    style={styles.profileImage}
                  />
                )}

                <View style={styles.buttonContainer}>
                  <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                      <AppText lineHeight={14} style={styles.infoCount}>
                        50
                      </AppText>
                      <AppText lineHeight={14} style={styles.infoTitle}>
                        Styles
                      </AppText>
                    </View>
                    <View style={styles.infoBox}>
                      <AppText lineHeight={14} style={styles.infoCount}>
                        1.1k
                      </AppText>
                      <AppText lineHeight={14} style={styles.infoTitle}>
                        Followers
                      </AppText>
                    </View>
                    <View style={styles.infoBox}>
                      <AppText lineHeight={14} style={styles.infoCount}>
                        100
                      </AppText>
                      <AppText lineHeight={14} style={styles.infoTitle}>
                        Following
                      </AppText>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => {
                      handleFollowUser(!follow);
                    }}>
                    <AppText lineHeight={14} style={styles.editText}>
                      {follow ? 'Following' : 'Follow'}
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.nameContainer}>
                <AppText lineHeight={14} style={styles.userName}>
                  @{data?.data?.userName}
                </AppText>
                <AppText lineHeight={16} style={styles.name}>
                  {data?.data?.firstName} {data?.data?.lastName}
                </AppText>
                <AppText lineHeight={16} style={styles.desc}>
                  {data?.data?.bio}
                </AppText>
              </View>
              <View style={styles.trending}>
                <AppText lineHeight={16} style={styles.tendingCount}>
                  10
                </AppText>
                <TrendIcon />
                <AppText lineHeight={14} style={styles.tendingTitle}>
                  Styles
                </AppText>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 20,
                }}>
                {dummyData.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      // onPress={() => {
                      //   navigation.navigate('StyleViewScreen', {
                      //     image: item.image,
                      //     key: index.toString(),
                      //   });
                      // }}
                    >
                      <Image
                        source={{
                          uri: item.image,
                          width: 200,
                          height: 200,
                        }}
                        style={styles.trendingImage}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View style={styles.separatorContainer}>
                <View style={styles.separator} />
                <AppText lineHeight={18} style={styles.separatorText}>
                  STYLES
                </AppText>
                <View style={styles.separator} />
              </View>
            </View>
          }
          data={userStyles}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate('StyleViewScreen', {
                //     image: item.image,
                //     key: index.toString(),
                //   });
                // }}
                style={{
                  marginHorizontal: (3 * index) / 3 === index ? 3 : 0,
                }}>
                <Image
                  source={{
                    uri: `${S3_BUCKET_URL}/${item.image}`,
                    height: PixelRatio.getPixelSizeForLayoutSize(
                      horizontalScale(250),
                    ),
                    width: PixelRatio.getPixelSizeForLayoutSize(150),
                  }}
                  style={styles.styleImage}
                />
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          contentContainerStyle={{
            paddingRight: 5,
            paddingBottom: 100,
            paddingTop: 20,
          }}
          numColumns={3}
          onMomentumScrollBegin={() => {
            setIsScrollStart(true);
          }}
          onMomentumScrollEnd={() => {
            setIsScrollStart(false);
          }}
          onEndReached={() => {
            if (userStyles.length > 0 && isScrollStart) {
              getUserStylesBuUserName({
                userName,
                cursor: userStyles[userStyles.length - 1].id,
              }).then(res => {
                if (res?.data?.success) {
                  setUserStyles([...res.data?.data, ...userStyles]);
                }
              });
            }
          }}
        />
      </View>
    </Container>
  );
};

export default CreatorProfileScreen;

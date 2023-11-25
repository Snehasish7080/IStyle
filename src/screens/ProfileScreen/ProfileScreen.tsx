import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import {S3_BUCKET_URL} from '@env';
import React from 'react';
import Container from '../../atoms/Container/Container';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import {styles} from './ProfileScreenStyles';
import AppText from '../../atoms/AppText/AppText';
import TrendIcon from '../../atoms/TrendIcon/TrendIcon';
import {data} from '../../utils/dummyData';
import {horizontalScale} from '../../utils/scale';
import {ProfileNavProps} from '../../navigations/ProfileNavigation/ProfileNavigationTypes';
import {useAppSelector} from '../../feature/hooks';
import {useGetUserStylesQuery} from '../../feature/services/style';

const ProfileScreen: React.FC<ProfileNavProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  const user = useAppSelector(state => state.userSlice.user);
  const userStyles = useAppSelector(state => state.styleSlice.userStyle);

  useGetUserStylesQuery(undefined);
  return (
    <Container>
      <AppHeader hideSetting={false} hideChat={true} />
      <View style={styles.mainContainer}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={styles.profileContainer}>
                <Image
                  source={{
                    uri: `${S3_BUCKET_URL}/${user?.profilePic}`,
                    width: 100,
                    height: 100,
                  }}
                  style={styles.profileImage}
                />

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
                      navigation.navigate('UpdateProfileScreen');
                    }}>
                    <AppText lineHeight={14} style={styles.editText}>
                      Edit
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.nameContainer}>
                <AppText lineHeight={14} style={styles.userName}>
                  @{user?.userName}
                </AppText>
                <AppText lineHeight={16} style={styles.name}>
                  {user?.firstName} {user?.lastName}
                </AppText>
                <AppText lineHeight={16} style={styles.desc}>
                  {user?.bio}
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
                {data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate('StyleViewScreen', {
                          image: item.image,
                          key: index.toString(),
                        });
                      }}>
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
                onPress={() => {
                  navigation.navigate('StyleViewScreen', {
                    image: item.image,
                    key: index.toString(),
                  });
                }}
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
          // columnWrapperStyle={{
          //   justifyContent: 'space-between',
          // }}
        />
      </View>
    </Container>
  );
};

export default ProfileScreen;

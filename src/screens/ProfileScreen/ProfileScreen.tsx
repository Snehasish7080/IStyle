import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Container from '../../atoms/Container/Container';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import {styles} from './ProfileScreenStyles';
import AppText from '../../atoms/AppText/AppText';
import TrendIcon from '../../atoms/TrendIcon/TrendIcon';
import {data} from '../../utils/dummyData';
import {horizontalScale} from '../../utils/scale';
import {ProfileNavProps} from '../../navigations/ProfileNavigation/ProfileNavigationTypes';

const ProfileScreen: React.FC<ProfileNavProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  return (
    <Container>
      <AppHeader hideSearch={true} hideSetting={false} hideChat={true} />
      <View style={styles.mainContainer}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={styles.profileContainer}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1602564183692-3fa56180279b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
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
                  <TouchableOpacity style={styles.editBtn}>
                    <AppText lineHeight={14} style={styles.editText}>
                      Edit
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.nameContainer}>
                <AppText lineHeight={14} style={styles.userName}>
                  @laurachautee
                </AppText>
                <AppText lineHeight={16} style={styles.name}>
                  Laura Chautee
                </AppText>
                <AppText lineHeight={16} style={styles.desc}>
                  PIVOTGANG 🏀 CARE FOR ME TOUR OUT NOW 🎙 #CHI-TOWN This remind
                  me of before we had insomnia Sleepin' peacefully, never needed
                  a pile of drugs
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
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('StyleViewScreen', {
                    image: item.image,
                    key: index.toString(),
                  });
                }}>
                <Image
                  source={{
                    uri: item.image,
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
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
      </View>
    </Container>
  );
};

export default ProfileScreen;

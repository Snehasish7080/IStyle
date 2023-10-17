import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  PixelRatio,
} from 'react-native';
import React from 'react';
import Container from '../../atoms/Container/Container';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import {styles} from './ProfileScreenStyles';
import AppText from '../../atoms/AppText/AppText';
import TrendIcon from '../../atoms/TrendIcon/TrendIcon';
import {data} from '../../utils/dummyData';
import {horizontalScale} from '../../utils/scale';

const ProfileScreen = () => {
  return (
    <Container>
      <AppHeader />
      <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1602564183692-3fa56180279b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
              width: 100,
              height: 100,
            }}
            style={styles.profileImage}
          />

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
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 20,
            }}>
            {data.map((item, index) => {
              return (
                <Image
                  source={{
                    uri: item.image,
                    width: 200,
                    height: 200,
                  }}
                  key={index}
                  style={styles.trendingImage}
                />
              );
            })}
          </ScrollView>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
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
            );
          }}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          contentContainerStyle={{
            paddingRight: 5,
            paddingBottom: 400,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
      </View>
    </Container>
  );
};

export default ProfileScreen;

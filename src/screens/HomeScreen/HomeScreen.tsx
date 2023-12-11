import React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import AppText from '../../atoms/AppText/AppText';
import {useAppSelector} from '../../feature/hooks';
import {useGetUserFeedQuery} from '../../feature/services/feed';
import {useGetUserQuery} from '../../feature/services/user';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import StyleCard from '../../molecules/StyleCard/StyleCard';
import StyleTagModal from '../../organisms/StyleTagModal/StyleTagModal';
import VerifyMobileModal from '../../organisms/VerifyMobileModal/VerifyMobileModal';
import {data} from '../../utils/dummyData';
import {styles} from './HomeScreenStyles';

const HomeScreen = () => {
  useGetUserQuery(undefined);
  useGetUserFeedQuery(undefined);
  const user = useAppSelector(state => state.userSlice.user);
  const userFeed = useAppSelector(state => state.feedSlice.userFeed);

  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.container]}>
        <AppHeader />
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.tagLineContainer}>
              <AppText lineHeight={18} style={styles.tagLine}>
                Ready to
              </AppText>
              <AppText lineHeight={18} style={styles.goTagLine}>
                Go
              </AppText>
            </View>
          }
          data={userFeed}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return <StyleCard {...item} />;
          }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
            paddingHorizontal: 20,
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 20,
              }}
            />
          )}
          scrollEventThrottle={16}
          decelerationRate="fast"
        />
      </Animated.View>

      <VerifyMobileModal visible={!user?.isMobileVerified} />
      <StyleTagModal visible={!user?.isComplete} />
    </View>
  );
};

export default HomeScreen;

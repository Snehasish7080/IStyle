import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {scale, verticalScale} from 'react-native-size-matters';
import AppText from '../../atoms/AppText/AppText';
import Container from '../../atoms/Container/Container';
import {useAppSelector} from '../../feature/hooks';
import {
  useGetUserFeedQuery,
  useLazyGetUserFeedQuery,
} from '../../feature/services/feed';
import {useGetUserQuery} from '../../feature/services/user';
import AppHeader from '../../molecules/AppHeader/AppHeader';
import StyleCard from '../../molecules/StyleCard/StyleCard';
import StyleTagModal from '../../organisms/StyleTagModal/StyleTagModal';
import VerifyMobileModal from '../../organisms/VerifyMobileModal/VerifyMobileModal';
import {styles} from './HomeScreenStyles';

const HomeScreen = () => {
  useGetUserQuery(undefined);

  useGetUserFeedQuery({
    cursor: '',
  });
  const [getUserFeed] = useLazyGetUserFeedQuery();
  const user = useAppSelector(state => state.userSlice.user);
  const userFeed = useAppSelector(state => state.feedSlice.userFeed);

  const [isScrollStart, setIsScrollStart] = useState(false);

  return (
    <Container>
      <AppHeader />

      <FlatList
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
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <StyleCard {...item} />;
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: verticalScale(100),
          paddingHorizontal: scale(20),
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
        onMomentumScrollBegin={() => {
          setIsScrollStart(true);
        }}
        onEndReached={() => {
          if (userFeed.length > 0 && isScrollStart) {
            getUserFeed({
              cursor: userFeed[userFeed.length - 1].created_at,
            }).finally(() => {
              setIsScrollStart(false);
            });
          }
        }}
      />

      <VerifyMobileModal visible={!user?.isMobileVerified} />
      <StyleTagModal visible={!user?.isComplete} />
    </Container>
  );
};

export default HomeScreen;

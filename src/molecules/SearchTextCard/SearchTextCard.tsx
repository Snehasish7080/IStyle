import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from './SearchTextCardStyles';
import {S3_BUCKET_URL} from '@env';
import AppText from '../../atoms/AppText/AppText';
import ProfileIcon from '../../atoms/ProfileIcon/ProfileIcon';
import {Colors} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParentRouteList} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import {useAppSelector} from '../../feature/hooks';
import {ExploreNavigationRouteList} from '../../navigations/ExploreNavigation/ExploreNavigationTypes';
import {useLazySearchStyleByTextQuery} from '../../feature/services/search';

type SearchTextCardProps = {
  userName: string;
  tag: string;
  hashtag: string;
  userPic: string;
};
const SearchTextCard: React.FC<SearchTextCardProps> = ({
  hashtag,
  tag,
  userName,
  userPic,
}) => {
  const parentNavigation =
    useNavigation<NativeStackNavigationProp<ParentRouteList>>();

  const exploreNavigation =
    useNavigation<NativeStackNavigationProp<ExploreNavigationRouteList>>();

  const user = useAppSelector(state => state.userSlice.user);
  const [searchStyleByText] = useLazySearchStyleByTextQuery();

  const handlePress = () => {
    if (user?.userName === userName) {
      parentNavigation.push('UserProfileScreen');
    } else if (Boolean(userName)) {
      parentNavigation.push('CreatorProfileScreen', {
        userName,
      });
    } else if (tag) {
      searchStyleByText(tag);
      exploreNavigation.navigate('SearchResultScreen', {
        searchText: tag,
      });
    } else if (hashtag) {
      searchStyleByText(hashtag);
      exploreNavigation.navigate('SearchResultScreen', {
        searchText: hashtag,
      });
    }
  };
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {Boolean(userName) && Boolean(userPic) && (
        <Image
          source={{
            uri: `${S3_BUCKET_URL}/${userPic}`,
          }}
          style={styles.userPic}
        />
      )}
      {Boolean(userName) && !Boolean(userPic) && (
        <View style={styles.userEmptyPic}>
          <ProfileIcon color={Colors.dark} size={18} />
        </View>
      )}

      {Boolean(userName) && (
        <AppText lineHeight={14} style={styles.searchText}>
          {userName}
        </AppText>
      )}
      {Boolean(tag) && (
        <AppText lineHeight={14} style={styles.searchText}>
          {tag}
        </AppText>
      )}
      {Boolean(hashtag) && (
        <AppText lineHeight={14} style={styles.searchText}>
          {hashtag}
        </AppText>
      )}
    </Pressable>
  );
};

export default SearchTextCard;

import {View} from 'react-native';
import React from 'react';
import {ExploreNavProps} from '../../navigations/ExploreNavigation/ExploreNavigationTypes';
import Container from '../../atoms/Container/Container';
import BackSearchHeader from '../../molecules/BackSearchHeader/BackSearchHeader';
import {SyncedScrollViewContext} from './SyncedScrollViewContext';
import SyncedScrollView from './SyncedScrollView';
import ExploreCard from '../../molecules/ExploreCard/ExploreCard';
import {useSharedValue} from 'react-native-reanimated';
import {styles} from './SearchResultScreenStyles';
import {useAppSelector} from '../../feature/hooks';
import {useLazyGetStyleByIdQuery} from '../../feature/services/style';

const SearchResultScreen: React.FC<ExploreNavProps<'SearchResultScreen'>> = ({
  navigation,
  route,
}) => {
  const activeScrollView = useSharedValue('');
  const offsetPercent = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  // useSearchStyleByTextQuery(route?.params?.searchText);
  const searchResult = useAppSelector(state => state.searchStyleSlice);
  const [getStyleById] = useLazyGetStyleByIdQuery();

  return (
    <Container>
      <BackSearchHeader
        onBack={() => {
          navigation.goBack();
        }}
        searchText={route?.params?.searchText}
        onPressSearch={() => {
          navigation.goBack();
        }}
      />
      <View>
        <SyncedScrollViewContext.Provider
          value={{
            activeScrollView,
            offsetPercent,
            scrollY,
            prevScrollY,
          }}>
          <View style={styles.listContainer}>
            <SyncedScrollView
              data={searchResult.searchStyles0}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <ExploreCard
                    id={item.id}
                    image={item.image}
                    isSmall={index % 2 === 0}
                    onPress={() => {
                      try {
                        getStyleById(item.id).then(res => {
                          if (res.data?.success) {
                            navigation.navigate('StyleViewScreen', {
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
                    }}
                  />
                );
              }}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              contentContainerStyle={{
                paddingRight: 5,
                paddingBottom: 200,
                paddingTop: 10,
              }}
              id={'first'}
              showsVerticalScrollIndicator={false}
              directionalLockEnabled={true}
              scrollEventThrottle={16}
              decelerationRate={'fast'}
            />
            <SyncedScrollView
              data={searchResult.searchStyles1}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => {
                return (
                  <ExploreCard
                    id={item.id}
                    image={item.image}
                    isSmall={index % 2 !== 0}
                    onPress={() => {
                      try {
                        getStyleById(item.id).then(res => {
                          if (res.data?.success) {
                            navigation.navigate('StyleViewScreen', {
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
                    }}
                  />
                );
              }}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              contentContainerStyle={{
                paddingLeft: 5,
                paddingBottom: 200,
                paddingTop: 10,
              }}
              id={'second'}
              showsVerticalScrollIndicator={false}
              directionalLockEnabled={true}
              scrollEventThrottle={16}
              decelerationRate={'fast'}
            />
          </View>
        </SyncedScrollViewContext.Provider>
      </View>
    </Container>
  );
};

export default SearchResultScreen;

import {View, Text} from 'react-native';
import React from 'react';
import {ExploreNavProps} from '../../navigations/ExploreNavigation/ExploreNavigationTypes';
import Container from '../../atoms/Container/Container';
import BackSearchHeader from '../../molecules/BackSearchHeader/BackSearchHeader';
import {SyncedScrollViewContext} from './SyncedScrollViewContext';
import SyncedScrollView from './SyncedScrollView';
import ExploreCard from '../../molecules/ExploreCard/ExploreCard';
import {data} from '../../utils/dummyData';
import {useSharedValue} from 'react-native-reanimated';
import {styles} from './SearchResultScreenStyles';

const SearchResultScreen: React.FC<ExploreNavProps<'SearchResultScreen'>> = ({
  navigation,
  route,
}) => {
  const activeScrollView = useSharedValue('');
  const offsetPercent = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  return (
    <Container>
      <BackSearchHeader
        onBack={() => {
          navigation.goBack();
        }}
        searchText={route?.params?.searchText}
        onPressSearch={() => {
          navigation.navigate('SearchScreen');
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
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <ExploreCard
                    id={index.toString() + 'first'}
                    image={item.image}
                    isSmall={index % 2 === 0}
                    onPress={() => {
                      navigation.navigate('StyleViewScreen', {
                        image: item.image,
                        key: index.toString() + 'first',
                      });
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
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <ExploreCard
                    id={index.toString() + 'second'}
                    image={item.image}
                    isSmall={index % 2 !== 0}
                    onPress={() => {
                      navigation.navigate('StyleViewScreen', {
                        image: item.image,
                        key: index.toString() + 'second',
                      });
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

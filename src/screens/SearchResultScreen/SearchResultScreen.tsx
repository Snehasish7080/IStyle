import {View, Text} from 'react-native';
import React from 'react';
import {ExploreNavProps} from '../../navigations/ExploreNavigation/ExploreNavigationTypes';
import Container from '../../atoms/Container/Container';
import BackSearchHeader from '../../molecules/BackSearchHeader/BackSearchHeader';

const SearchResultScreen: React.FC<ExploreNavProps<'SearchResultScreen'>> = ({
  navigation,
  route,
}) => {
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
        <Text>SearchResultScreen: React.FC</Text>
      </View>
    </Container>
  );
};

export default SearchResultScreen;

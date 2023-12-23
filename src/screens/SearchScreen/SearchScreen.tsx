import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import Container from '../../atoms/Container/Container';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {ParentNavProps} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import {styles} from './SearchScreenStyle';
import AppSearchInput from '../../atoms/AppSearchInput/AppSearchInput';
import {useController, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import AppText from '../../atoms/AppText/AppText';
import {useDebounce} from '../../utils/debounce';
import {useGetSearchByTextQuery} from '../../feature/services/search';
import SearchTextCard from '../../molecules/SearchTextCard/SearchTextCard';

type searchData = {
  search: string;
};

const schema = yup.object({
  search: yup.string().required(),
});

const SearchScreen: React.FC<ParentNavProps<'SearchScreen'>> = ({
  route,
  navigation,
}) => {
  const {control} = useForm<searchData>({
    defaultValues: {
      search: '',
    },
    resolver: yupResolver(schema),
  });

  const {field} = useController({
    control,
    name: 'search',
    defaultValue: '',
  });
  const searchValue = useDebounce(field.value, 500);

  const {data, isLoading} = useGetSearchByTextQuery(searchValue, {
    skip: !Boolean(searchValue),
  });

  return (
    <Container style={styles.mainContainer}>
      {/* <BackHeader title="Search" onBack={() => navigation.goBack()} /> */}
      <View style={styles.bodyContainer}>
        <View style={styles.searchBarContainer}>
          <AppSearchInput
            name="search"
            control={control}
            style={{flex: 1}}
            autoFocus={true}
          />
          <Pressable
            style={{marginLeft: 16}}
            onPress={() => {
              navigation.goBack();
            }}>
            <AppText lineHeight={14} style={styles.cancelText}>
              Cancel
            </AppText>
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 20,
          }}>
          {(data?.data || []).map((item, index) => {
            return <SearchTextCard {...item} key={index} />;
          })}
        </ScrollView>
      </View>
    </Container>
  );
};

export default SearchScreen;

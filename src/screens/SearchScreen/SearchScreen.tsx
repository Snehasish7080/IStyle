import {View, Pressable, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../atoms/Container/Container';
import {styles} from './SearchScreenStyle';
import AppSearchInput from '../../atoms/AppSearchInput/AppSearchInput';
import {useController, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import AppText from '../../atoms/AppText/AppText';
import {useDebounce} from '../../utils/debounce';
import {
  useGetSearchByTextQuery,
  useLazySearchStyleByTextQuery,
} from '../../feature/services/search';
import SearchTextCard from '../../molecules/SearchTextCard/SearchTextCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ExploreNavigationRouteList,
  ExploreNavProps,
} from '../../navigations/ExploreNavigation/ExploreNavigationTypes';
import {useAppDispatch} from '../../feature/hooks';
import {setSearchStyles} from '../../feature/slice/searchStyleSlice';

type searchData = {
  search: string;
};

const schema = yup.object({
  search: yup.string().required(),
});

const SearchScreen: React.FC<ExploreNavProps<'SearchScreen'>> = ({
  navigation,
}) => {
  const exploreNavigation =
    useNavigation<NativeStackNavigationProp<ExploreNavigationRouteList>>();
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
  const dispatch = useAppDispatch();

  const {data, isLoading} = useGetSearchByTextQuery(searchValue, {
    skip: !Boolean(searchValue),
  });

  const [searchStyleByText] = useLazySearchStyleByTextQuery();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setSearchStyles([]));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Container style={styles.mainContainer}>
      <View style={styles.bodyContainer}>
        <KeyboardAvoidingView style={styles.searchBarContainer}>
          <AppSearchInput
            name="search"
            control={control}
            style={{flex: 1}}
            autoFocus={true}
            onSubmitEditing={() => {
              searchStyleByText(field.value);
              exploreNavigation.navigate('SearchResultScreen', {
                searchText: field.value,
              });
            }}
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
        </KeyboardAvoidingView>
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

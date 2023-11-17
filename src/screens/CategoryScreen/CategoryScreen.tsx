import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {ParentNavProps} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import Container from '../../atoms/Container/Container';
import {styles} from './CategoryScreenStyles';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import AppText from '../../atoms/AppText/AppText';
import {Colors} from '../../utils/theme';

const tagList = [
  'Casual',
  'Party',
  'Office',
  'Meeting',
  'Wedding',
  'Birthday',
  'Formal',
  'Streetwear',
  'Bohemian',
  'Vintage',
  'Preppy',
  'Minimalist',
  'Artsy',
  'Dating',
  'Festive',
  'Parisian',
  'Athleisure',
  'Classic',
  'Business',
  'Retro',
  'Grunge',
  'Trendy',
  'Preppy',
  'Punk',
  'Tomboy',
  'Gothic',
  'Ethnic',
];

const CategoryScreen: React.FC<ParentNavProps<'CategoryScreen'>> = ({
  navigation,
  route,
}) => {
  const [search, setSearch] = useState<string>('');
  return (
    <Container style={styles.container}>
      <BackHeader
        onBack={() => {
          navigation.goBack();
        }}
        title={'Add Style Tags'}
      />
      <View style={styles.bodyContainer}>
        <TouchableOpacity style={styles.searchBox} activeOpacity={1}>
          <SearchIcon color={Colors.placeholder} />
          <TextInput
            style={styles.input}
            placeholder={'search'}
            placeholderTextColor={Colors.placeholder}
            onChangeText={value => setSearch(value)}
            value={search}
          />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{paddingVertical: 16}}>
          <View style={styles.tagListContainer}>
            {tagList.map((item, index) => {
              if (Boolean(search)) {
                if (item.toLowerCase().includes(search.toLowerCase())) {
                  return (
                    <TouchableOpacity key={index} style={styles.tagList}>
                      <AppText lineHeight={12} style={styles.tag}>
                        {item}
                      </AppText>
                    </TouchableOpacity>
                  );
                } else {
                  return null;
                }
              }
              return (
                <TouchableOpacity key={index} style={styles.tagList}>
                  <AppText lineHeight={12} style={styles.tag}>
                    {item}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default CategoryScreen;

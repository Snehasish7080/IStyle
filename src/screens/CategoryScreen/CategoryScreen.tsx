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
import CloseIcon from '../../atoms/CloseIcon/CloseIcon';

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onClickTag = (value: string) => {
    const temp = [...selectedTags];
    const index = temp.findIndex(x => x === value);

    if (index < 0) {
      temp.push(value);
    } else {
      temp.splice(index, 1);
    }

    setSelectedTags(temp);
  };
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 30, paddingBottom: 0}}>
          {selectedTags.map((item, index) => {
            return (
              <View key={index} style={styles.selectedTag}>
                <AppText lineHeight={12} style={styles.tag}>
                  {item}
                </AppText>
                <TouchableOpacity
                  style={styles.remove}
                  onPress={() => {
                    onClickTag(item);
                  }}
                  activeOpacity={1}>
                  <CloseIcon size={18} />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <AppText lineHeight={18} style={styles.separatorText}>
            Tags
          </AppText>
          <View style={styles.separator} />
        </View>

        <ScrollView
          contentContainerStyle={{paddingVertical: 16}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.tagListContainer}>
            {tagList.map((item, index) => {
              if (Boolean(search)) {
                if (item.toLowerCase().includes(search.toLowerCase())) {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.tagList,
                        {
                          borderWidth: selectedTags.includes(item) ? 0 : 1,
                          backgroundColor: selectedTags.includes(item)
                            ? Colors.dark
                            : Colors.white,
                        },
                      ]}
                      onPress={() => {
                        onClickTag(item);
                      }}>
                      <AppText
                        lineHeight={12}
                        style={[
                          styles.tag,
                          {
                            color: selectedTags.includes(item)
                              ? Colors.white
                              : Colors.dark,
                          },
                        ]}>
                        {item}
                      </AppText>
                    </TouchableOpacity>
                  );
                } else {
                  return null;
                }
              }
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  style={[
                    styles.tagList,
                    {
                      borderWidth: selectedTags.includes(item) ? 0 : 1,
                      backgroundColor: selectedTags.includes(item)
                        ? Colors.dark
                        : Colors.white,
                    },
                  ]}
                  onPress={() => {
                    onClickTag(item);
                  }}>
                  <AppText
                    lineHeight={12}
                    style={[
                      styles.tag,
                      {
                        color: selectedTags.includes(item)
                          ? Colors.white
                          : Colors.dark,
                      },
                    ]}>
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

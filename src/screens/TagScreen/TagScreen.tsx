import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {ParentNavProps} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import Container from '../../atoms/Container/Container';
import {styles} from './TagScreenStyles';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import AppText from '../../atoms/AppText/AppText';
import {Colors} from '../../utils/theme';
import CloseIcon from '../../atoms/CloseIcon/CloseIcon';
import {useGetAllTagsQuery} from '../../feature/services/tags';
import {ITag} from '../../interface/tagInterface';
import {
  useCreateStyleMutation,
  useGetStyleUploadUrlMutation,
  useUploadStylePictureMutation,
} from '../../feature/services/style';
import {ILink} from '../../interface/linkInterface';
import BackHeaderWithAction from '../../molecules/BackHeaderWithAction/BackHeaderWithAction';

type url = {
  type: 'link' | 'style';
  url: string;
};
const TagScreen: React.FC<ParentNavProps<'TagScreen'>> = ({
  navigation,
  route,
}) => {
  const {image, links, hashtags} = route?.params;
  const {data, isSuccess, isLoading} = useGetAllTagsQuery(undefined);
  const [getStyleUpload] = useGetStyleUploadUrlMutation();
  const [uploadStylePicture] = useUploadStylePictureMutation();
  const [createStyle] = useCreateStyleMutation();

  const [search, setSearch] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const onClickTag = (value: ITag) => {
    const temp = [...selectedTags];
    const index = temp.findIndex(x => x.id === value.id);

    if (index < 0) {
      temp.push(value);
    } else {
      temp.splice(index, 1);
    }

    setSelectedTags(temp);
  };

  const getBlob = async (fileUri: string) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };

  const onClickShare = () => {
    getStyleUpload({
      linkCount: links.length,
    })
      .unwrap()
      .then(res => {
        if (res.success) {
          const styleImage = res.data.style.key;
          const styleLinks: ILink[] = res.data.links.map((x, index) => {
            return {
              url: links[index].url,
              image: x.key,
            };
          });
          const styleTags = selectedTags.map(x => x.id);

          // get all urls
          const allUrl: url[] = [];
          if (res.data.style.url) {
            allUrl.push({
              type: 'style',
              url: res.data.style.url,
            });
          }
          if (res.data.links?.length > 0) {
            res.data.links.map(item => {
              allUrl.push({
                type: 'link',
                url: item.url,
              });
            });
          }

          return {
            styleImage,
            styleLinks,
            styleTags,
            allUrl,
          };
        }
      })
      .then(value => {
        if (value) {
          // // upload all images
          Promise.all(
            value.allUrl.map(async (x, index) => {
              if (x.type === 'style') {
                const imageBody = await getBlob(image);
                await uploadStylePicture({
                  body: imageBody,
                  url: x.url,
                });
              }

              if (x.type === 'link' && links.length > 0) {
                const imageBody = await getBlob(links[index - 1].image);
                await uploadStylePicture({
                  body: imageBody,
                  url: x.url,
                });
              }
            }),
          )
            .then(() => {
              // create style
              createStyle({
                image: value.styleImage,
                links: value.styleLinks,
                tags: value.styleTags,
                hashtags: hashtags,
              })
                .unwrap()
                .then(res => {
                  if (res.success) {
                    navigation.navigate('Authenticated');
                  }
                });
            })
            .catch(e => console.log(e));
        }
      })
      .catch();
  };

  return (
    <Container style={styles.container}>
      <BackHeaderWithAction
        onBack={() => {
          navigation.goBack();
        }}
        title={'Add Style Tags'}
        onAction={onClickShare}
        actionTitle="Share"
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

        {selectedTags.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 30, paddingBottom: 0}}>
            {selectedTags.map((item, index) => {
              return (
                <View key={index} style={styles.selectedTag}>
                  <AppText lineHeight={12} style={styles.tag}>
                    {item.name}
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
        )}

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <AppText lineHeight={18} style={styles.separatorText}>
            Tags
          </AppText>
          <View style={styles.separator} />
        </View>

        {isSuccess && (
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 16,
            }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.tagListContainer}>
              {data?.data.map((item, index) => {
                if (Boolean(search)) {
                  if (item.name.toLowerCase().includes(search.toLowerCase())) {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.tagList,
                          {
                            borderWidth: selectedTags.some(
                              x => x.id === item.id,
                            )
                              ? 0
                              : 1,
                            backgroundColor: selectedTags.some(
                              x => x.id === item.id,
                            )
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
                              color: selectedTags.some(x => x.id === item.id)
                                ? Colors.white
                                : Colors.dark,
                            },
                          ]}>
                          {item.name}
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
                        borderWidth: selectedTags.some(x => x.id === item.id)
                          ? 0
                          : 1,
                        backgroundColor: selectedTags.some(
                          x => x.id === item.id,
                        )
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
                          color: selectedTags.some(x => x.id === item.id)
                            ? Colors.white
                            : Colors.dark,
                        },
                      ]}>
                      {item.name}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </Container>
  );
};

export default TagScreen;

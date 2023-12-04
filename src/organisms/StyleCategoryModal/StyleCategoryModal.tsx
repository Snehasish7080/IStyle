import {View, Text, Modal, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './StyleCategoryModalStyles';
import BackHeaderWithAction from '../../molecules/BackHeaderWithAction/BackHeaderWithAction';
import {useGetAllTagsQuery} from '../../feature/services/tags';
import AppText from '../../atoms/AppText/AppText';
import {ITag} from '../../interface/tagInterface';
import {Colors} from '../../utils/theme';

const StyleCategoryModal: React.FC = () => {
  const {data, isSuccess} = useGetAllTagsQuery(undefined);
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

  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <BackHeaderWithAction
            title="mark your styles"
            onBack={() => {}}
            onAction={() => {}}
            actionTitle="Done"
          />
          <AppText lineHeight={14} style={styles.subTitle}>
            Mark your style tags to get better suggestions.
          </AppText>
          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <AppText lineHeight={18} style={styles.separatorText}>
              Tags
            </AppText>
            <View style={styles.separator} />
          </View>

          {isSuccess && (
            <ScrollView
              contentContainerStyle={{paddingVertical: 16}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.tagListContainer}>
                {data?.data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      key={index}
                      style={[
                        styles.tagList,
                        {
                          borderWidth: 1,
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
      </View>
    </Modal>
  );
};

export default StyleCategoryModal;

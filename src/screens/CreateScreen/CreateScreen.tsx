import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  PixelRatio,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AppText from '../../atoms/AppText/AppText';
import CloseIcon from '../../atoms/CloseIcon/CloseIcon';
import Container from '../../atoms/Container/Container';
import ForwardIcon from '../../atoms/ForwardIcon/ForwardIcon';
import LinkIcon from '../../atoms/LinkIcon/LinkIcon';
import {ILink} from '../../interface/linkInterface';
import {ParentNavProps} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import AddLinkModal from '../../organisms/AddLinkModal/AddLinkModal';
import {styles} from './CreateScreenStyles';

const CreateScreen: React.FC<ParentNavProps<'CreateScreen'>> = ({
  navigation,
  route,
}) => {
  const {postUrl} = route?.params;
  const {height, width} = useWindowDimensions();
  const [links, setLinks] = useState<ILink[]>([]);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };
  return (
    <Container
      mainContainerStyle={{
        justifyContent: 'center',
      }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={1}
          onPress={() => {
            navigation.goBack();
          }}
          hitSlop={{
            top: 10,
            bottom: 10,
            right: 10,
            left: 10,
          }}>
          <CloseIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('TagScreen', {
              image: postUrl,
              links,
              hashtags: hashTags,
            });
          }}
          hitSlop={{
            top: 10,
            bottom: 10,
            right: 10,
            left: 10,
          }}>
          <ForwardIcon />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={{
          uri: postUrl,
          height: PixelRatio.getPixelSizeForLayoutSize(height - 72),
          width: PixelRatio.getPixelSizeForLayoutSize(width - 4),
        }}
        style={styles.image}
        resizeMode="cover"
        progressiveRenderingEnabled={true}>
        {links.length > 0 && (
          <View style={styles.mainLinkContainer}>
            <TouchableOpacity
              style={[
                styles.backBtn,
                {
                  marginBottom: 10,
                },
              ]}
              activeOpacity={1}
              onPress={() => {
                setLinks([]);
              }}
              hitSlop={{
                top: 10,
                bottom: 10,
                right: 10,
                left: 10,
              }}>
              <CloseIcon />
            </TouchableOpacity>
            <View style={styles.scrollContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  style={styles.linkContainer}
                  onPress={handleVisible}
                  activeOpacity={1}>
                  <LinkIcon size={25} />
                </TouchableOpacity>
                {links?.map((item, index) => {
                  return (
                    <Image
                      source={{
                        uri: item.image,
                        width: PixelRatio.getPixelSizeForLayoutSize(50),
                        height: PixelRatio.getPixelSizeForLayoutSize(50),
                      }}
                      style={styles.link}
                      key={index}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        )}

        {links.length === 0 && (
          <View>
            <TouchableOpacity
              style={styles.addLinkContainer}
              onPress={handleVisible}
              activeOpacity={1}>
              <LinkIcon size={20} />
              <AppText lineHeight={12} style={styles.addLink}>
                add links & hashtags your style
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
      <AddLinkModal
        visible={visible}
        onClose={handleVisible}
        links={links}
        setLinks={setLinks}
        setHashTags={setHashTags}
        hashtags={hashTags}
      />
    </Container>
  );
};

export default CreateScreen;

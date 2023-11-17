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
import {ParentNavProps} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import AddLinkModal from '../../organisms/AddLinkModal/AddLinkModal';
import {styles} from './CreateScreenStyles';

type link = {
  image: string;
  url: string;
};
const CreateScreen: React.FC<ParentNavProps<'CreateScreen'>> = ({
  navigation,
  route,
}) => {
  const {postUrl} = route?.params;
  const {height, width} = useWindowDimensions();
  const [links, setLinks] = useState<link[]>([]);
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
            console.log({
              postUrl,
              links,
            });
            navigation.navigate('CategoryScreen');
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
                add links your style
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
      />
    </Container>
  );
};

export default CreateScreen;

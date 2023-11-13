import {
  View,
  Text,
  ImageBackground,
  PixelRatio,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {ParentNavProps} from '../../navigations/ParentNavigation/ParentNavigationTypes';
import Container from '../../atoms/Container/Container';
import {styles} from './CreateScreenStyles';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import BackIcon from '../../atoms/BackIcon/BackIcon';
import ShareIcon from '../../atoms/ShareIcon/ShareIcon';
import {data} from '../../utils/dummyData';
import LinkIcon from '../../atoms/LinkIcon/LinkIcon';
import AddLinkModal from '../../organisms/AddLinkModal/AddLinkModal';

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
          <BackIcon />
        </TouchableOpacity>
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
          <ShareIcon />
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
        <View
          style={{
            maxHeight: 220,
            marginLeft: 20,
            marginBottom: 20,
            borderRadius: 20,
            width: 80,
            backgroundColor: 'white',
            overflow: 'hidden',
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={handleVisible}>
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
      </ImageBackground>
      <AddLinkModal visible={visible} onClose={handleVisible} />
    </Container>
  );
};

export default CreateScreen;

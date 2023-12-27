import {yupResolver} from '@hookform/resolvers/yup';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import React, {useEffect, useRef, useState} from 'react';
import {
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageCropper from 'react-native-image-crop-picker';
import * as yup from 'yup';
import AppText from '../../atoms/AppText/AppText';
import ImageIcon from '../../atoms/ImageIcon/ImageIcon';
import LinkInputBox from '../../atoms/LinkInputBox/LinkInputBox';
import TrashIcon from '../../atoms/TrashIcon/TrashIcon';
import {ILink} from '../../interface/linkInterface';
import BackHeaderWithAction from '../../molecules/BackHeaderWithAction/BackHeaderWithAction';
import {hasAndroidPermission} from '../../utils/permissions';
import {Colors, FontFamily} from '../../utils/theme';
import MediaModal from '../MediaModal/MediaModal';
import {styles} from './AddLinkModalStyles';

type link = {
  url?: string;
  image?: string;
};
type AddLinkModalProps = {
  visible: boolean;
  onClose: () => void;
  setLinks: React.Dispatch<React.SetStateAction<ILink[]>>;
  links: link[];
  setHashTags: React.Dispatch<React.SetStateAction<string[]>>;
  hashtags: string[];
};

type linksData = {
  links: link[];
};

const schema = yup.object().shape({
  links: yup
    .array()
    .of(
      yup.object().shape(
        {
          url: yup.string().when('image', {
            is: (image: string) => Boolean(image),
            then: schema =>
              schema
                .required()
                .matches(
                  /(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                  'Enter correct url',
                ),
          }),
          image: yup.string().when('url', {
            is: (url: string) => Boolean(url),
            then: schema => schema.required(),
          }),
        },
        [['url', 'image']],
      ),
    )
    .required(),
});

const AddLinkModal: React.FC<AddLinkModalProps> = ({
  onClose,
  visible,
  setLinks,
  links,
  setHashTags,
  hashtags,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');
  const [medias, setMedias] = useState<PhotoIdentifier[]>([]);
  const ref = useRef<ScrollView>(null);
  const [text, setText] = useState<string>('');

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    setError,
  } = useForm<linksData>({
    defaultValues: {
      links:
        links.length > 0
          ? links
          : [
              {
                image: '',
                url: '',
              },
            ],
    },
    resolver: yupResolver(schema),
  });

  const {fields, append, remove, update} = useFieldArray({
    control,
    name: 'links',
  });

  const handleVisible = () => {
    setOpenModal(!openModal);
  };

  const onClickSelectPhotos = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    getAllPhotos();
    handleVisible();
  };
  const getAllPhotos = async () => {
    const photos = await CameraRoll.getPhotos({
      first: 20,
      groupTypes: 'All',
      assetType: 'Photos',
      include: ['fileSize', 'filename', 'fileExtension'],
    });

    setMedias([...medias, ...photos.edges]);
  };

  const onSelectPhoto = (file: string) => {
    ImageCropper.openCropper({
      path: file,
      width: 320,
      height: 500,
      mediaType: 'photo',
      cropperStatusBarColor: 'black',
      cropperToolbarTitle: 'Edit',
      cropperChooseColor: Colors.primary,
      hideBottomControls: true,
      enableRotationGesture: true,
      showCropFrame: false,
    })
      .then(image => {
        handleVisible();
        update(index, {
          image: image.path,
          url: currentUrl,
        });
        setError(`links.${index}.image`, {
          message: undefined,
        });
      })
      .catch(e => console.log('error', e));
  };

  const onSubmit = (data: linksData) => {
    const links = data.links.filter(x => x.url && x.image) as ILink[];
    setLinks(links);
    if (Boolean(text)) {
      const hashtags = text.split('#').filter(x => x);
      setHashTags(hashtags);
    }
    onClose();
  };

  useEffect(() => {
    if (hashtags.length > 0 && !Boolean(text)) {
      const tempText = hashtags.join('#');
      setText(tempText);
    }
  }, [hashtags]);
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.container}>
        <BackHeaderWithAction
          onBack={() => {
            onClose();
          }}
          title={'Add links & hashtags to your style'}
          actionTitle={'Done'}
          onAction={() => {
            handleSubmit(onSubmit)();
          }}
        />
        <View style={styles.bodyContainer}>
          <View style={styles.linkSection}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              ref={ref}
              onContentSizeChange={() => {
                ref.current?.scrollToEnd();
              }}>
              {fields.map((item, index) => {
                return (
                  <View style={styles.linkContainer} key={item.id}>
                    <View style={styles.imageContainer}>
                      <TouchableOpacity
                        style={[
                          styles.image,
                          {
                            borderWidth: item.image ? 0 : 0.5,
                          },
                        ]}
                        onPress={() => {
                          const value = getValues();
                          if (Boolean(value.links[index]?.url)) {
                            setIndex(index);
                            setCurrentUrl(value.links[index].url as string);
                            onClickSelectPhotos();
                          }
                        }}>
                        {item.image ? (
                          <Image
                            source={{
                              uri: item.image,
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        ) : (
                          <ImageIcon />
                        )}
                      </TouchableOpacity>
                      {errors?.links &&
                        errors?.links[index]?.image?.message && (
                          <AppText
                            lineHeight={12}
                            style={{
                              fontSize: 12,
                              color: Colors.error,
                              marginTop: 10,
                            }}>
                            {errors?.links[index]?.image?.message}
                          </AppText>
                        )}
                    </View>
                    <LinkInputBox
                      name={`links[${index}].url`}
                      control={control}
                      placeholder={'enter url'}
                      keyboardType="url"
                    />
                    {index > 0 && (
                      <TouchableOpacity
                        style={styles.trash}
                        onPress={() => {
                          remove(index);
                        }}>
                        <TrashIcon />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.addMoreBtn}
            onPress={() => {
              append({
                image: '',
                url: '',
              });
            }}>
            <AppText lineHeight={12}>Add more +</AppText>
          </TouchableOpacity>

          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <AppText lineHeight={18} style={styles.separatorText}>
              Hashtags
            </AppText>
            <View style={styles.separator} />
          </View>
          <View style={styles.hashTagContainer}>
            <TextInput
              style={styles.textInput}
              numberOfLines={4}
              placeholder={'add tags separate with #, eg. #newyear'}
              placeholderTextColor={Colors.placeholder}
              onChangeText={text => {
                setText(text);
              }}
              value={text}
            />
          </View>
        </View>

        <MediaModal
          visible={openModal}
          onClose={handleVisible}
          medias={medias}
          setMedias={setMedias}
          onSelectPhoto={onSelectPhoto}
        />
      </View>
    </Modal>
  );
};

export default AddLinkModal;

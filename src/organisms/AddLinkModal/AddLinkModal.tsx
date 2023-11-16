import {yupResolver} from '@hookform/resolvers/yup';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import React, {useState} from 'react';
import {
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import {Image, Modal, Platform, TouchableOpacity, View} from 'react-native';
import ImageCropper from 'react-native-image-crop-picker';
import * as yup from 'yup';
import AppText from '../../atoms/AppText/AppText';
import ImageIcon from '../../atoms/ImageIcon/ImageIcon';
import LinkInputBox from '../../atoms/LinkInputBox/LinkInputBox';
import TrashIcon from '../../atoms/TrashIcon/TrashIcon';
import BackHeaderWithAction from '../../molecules/BackHeaderWithAction/BackHeaderWithAction';
import {hasAndroidPermission} from '../../utils/permissions';
import {Colors} from '../../utils/theme';
import MediaModal from '../MediaModal/MediaModal';
import {styles} from './AddLinkModalStyles';

type link = {
  url: string;
  image: string;
};
type AddLinkModalProps = {
  visible: boolean;
  onClose: () => void;
  setLinks: React.Dispatch<React.SetStateAction<link[]>>;
  links: link[];
};

type linksData = {
  links: link[];
};

const schema = yup.object({
  links: yup
    .array()
    .of(
      yup.object().shape({
        url: yup
          .string()
          .required('required')
          .matches(
            /(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url',
          ),
        image: yup.string().required('required'),
      }),
    )
    .required(),
});

const AddLinkModal: React.FC<AddLinkModalProps> = ({
  onClose,
  visible,
  setLinks,
  links,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');
  const [medias, setMedias] = useState<PhotoIdentifier[]>([]);

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
    setLinks(data.links);
    onClose();
  };
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
          title={'Add product url'}
          actionTitle={'Done'}
          onAction={() => {
            handleSubmit(onSubmit)();
          }}
        />
        <View style={styles.bodyContainer}>
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
                      setIndex(index);
                      setCurrentUrl(value.links[index].url);
                      onClickSelectPhotos();
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
                  {errors?.links && errors?.links[index]?.image?.message && (
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

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {styles} from './AddLinkModalStyles';
import ImageIcon from '../../atoms/ImageIcon/ImageIcon';
import {useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import {Colors} from '../../utils/theme';
import LinkInputBox from '../../atoms/LinkInputBox/LinkInputBox';
import {hasAndroidPermission} from '../../utils/permissions';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import MediaModal from '../MediaModal/MediaModal';
import AppText from '../../atoms/AppText/AppText';
import TrashIcon from '../../atoms/TrashIcon/TrashIcon';
import BackHeaderWithAction from '../../molecules/BackHeaderWithAction/BackHeaderWithAction';
import ImageCropper from 'react-native-image-crop-picker';

type AddLinkModalProps = {
  visible: boolean;
  onClose: () => void;
};

type linksData = {
  links: {
    url: string;
    image: string;
  }[];
};

const schema = yup.object({
  links: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required('required'),
        image: yup.string().required('required'),
      }),
    )
    .required(),
});

const AddLinkModal: React.FC<AddLinkModalProps> = ({onClose, visible}) => {
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');
  const [medias, setMedias] = useState<PhotoIdentifier[]>([]);

  const {control, handleSubmit, watch} = useForm<linksData>({
    defaultValues: {
      links: [
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
      })
      .catch(e => console.log('error', e));
  };

  // const watchFieldArray = watch('links');
  // const controlledFields = fields.map((field, index) => {
  //   return {
  //     ...field,
  //     ...watchFieldArray[index],
  //   };
  // });

  console.log(currentUrl);

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
          onAction={() => {}}
        />
        <View style={styles.bodyContainer}>
          {fields.map((item, index) => {
            return (
              <View style={styles.linkContainer} key={item.id}>
                <TouchableOpacity
                  style={[
                    styles.image,
                    {
                      borderWidth: item.image ? 0 : 0.5,
                    },
                  ]}
                  onPress={() => {
                    setIndex(index);
                    setCurrentUrl(item.url);
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

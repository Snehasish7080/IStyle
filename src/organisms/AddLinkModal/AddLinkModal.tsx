import {View, Text, Modal} from 'react-native';
import React from 'react';
import BackHeader from '../../molecules/BackHeader/BackHeader';
import {styles} from './AddLinkModalStyles';
import ImageIcon from '../../atoms/ImageIcon/ImageIcon';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppInputBox from '../../atoms/AppInputBox/AppInputBox';
import {Colors} from '../../utils/theme';

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
  const {control, handleSubmit, getValues} = useForm<linksData>({
    defaultValues: {
      links: [],
    },
    resolver: yupResolver(schema),
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.container}>
        <BackHeader
          onBack={() => {
            onClose();
          }}
          title={'Add product url'}
        />
        <View style={styles.bodyContainer}>
          <View style={styles.linkContainer}>
            <View style={styles.image}>
              <ImageIcon />
            </View>
            <AppInputBox
              name={`links[${0}].url`}
              control={control}
              style={styles.inputBox}
              placeholder={'Enter Url'}
              labelStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                marginBottom: 20,
              }}
              keyboardType="url"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddLinkModal;

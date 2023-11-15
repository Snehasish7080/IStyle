import {
  View,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInput,
} from 'react-native';
import React from 'react';
import {Control, useController} from 'react-hook-form';
import {Colors, FontFamily} from '../../utils/theme';
import AppText from '../AppText/AppText';

type LinkInputBoxProps = TextInputProps & {
  control: Control<any, any>;
  name: string;
};

const LinkInputBox: React.FC<LinkInputBoxProps> = ({
  control,
  name,
  ...props
}) => {
  const {field, fieldState} = useController({
    control,
    name,
    defaultValue: '',
  });
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          borderBottomWidth: 0.5,
          flex: 1,
          height: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AppText lineHeight={12}>https://</AppText>
        <TextInput
          {...props}
          style={[
            {
              color: Colors.black,
              fontFamily: FontFamily.LatoRegular,
              fontSize: 12,
              padding: 0,
              flex: 1,
            },
          ]}
          placeholderTextColor={Colors.placeholder}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          numberOfLines={1}
        />
      </View>
      {fieldState?.invalid && (
        <AppText
          lineHeight={12}
          style={{
            fontSize: 12,
            color: Colors.error,
            marginTop: 10,
          }}>
          {fieldState.error?.message}fsdfs
        </AppText>
      )}
    </View>
  );
};

export default LinkInputBox;

import React from 'react';
import {Control, FieldValues, useController} from 'react-hook-form';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, FontFamily} from '../../utils/theme';
import AppText from '../AppText/AppText';

type AppInputBoxProps = TextInputProps & {
  control: Control<any, any>;
  name: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  label?: string;
};

const AppInputBox: React.FC<AppInputBoxProps> = ({
  control,
  name,
  style,
  label,
  labelStyle,
  containerStyle,
  ...props
}) => {
  const {field, fieldState} = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <View style={containerStyle}>
      {Boolean(label) && (
        <AppText
          lineHeight={14}
          style={[
            labelStyle,
            {
              left: 10,
              marginBottom: 10,
            },
          ]}>
          {label}
        </AppText>
      )}
      <View
        style={[
          {
            backgroundColor: Colors.textInputBackground,
            borderRadius: 16,
          },
          style,
        ]}>
        <TextInput
          {...props}
          style={[
            {
              paddingHorizontal: 20,
              color: Colors.black,
              fontFamily: FontFamily.LatoRegular,
              height: '100%',
              width: '100%',
            },
          ]}
          placeholderTextColor={Colors.placeholder}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
        />
      </View>
      {fieldState?.invalid && (
        <AppText
          lineHeight={12}
          style={{
            fontSize: 12,
            marginLeft: 10,
            color: Colors.error,
          }}>
          {fieldState.error?.message}
        </AppText>
      )}
    </View>
  );
};

export default AppInputBox;

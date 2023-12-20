import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors, FontFamily} from '../../utils/theme';
import SearchIcon from '../SearchIcon/SearchIcon';
import {Control, useController} from 'react-hook-form';

type AppSearchInputProps = TextInputProps & {
  control: Control<any, any>;
  name: string;
  style?: StyleProp<ViewStyle>;
};

const AppSearchInput: React.FC<AppSearchInputProps> = ({
  control,
  name,
  style,
  ...props
}) => {
  const {field, fieldState} = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <View
      style={[
        {
          borderColor: Colors.lightDark,
          width: '100%',
          height: 40,
          borderRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: Colors.textInputBackground,
        },
        style,
      ]}>
      <SearchIcon color={Colors.placeholder} />
      <TextInput
        {...props}
        style={[
          {
            color: Colors.dark,
            fontFamily: FontFamily.LatoRegular,
            height: '100%',
            flex: 1,
            fontSize: 12,
          },
        ]}
        returnKeyType="search"
        placeholderTextColor={Colors.placeholder}
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
      />
    </View>
  );
};

export default AppSearchInput;

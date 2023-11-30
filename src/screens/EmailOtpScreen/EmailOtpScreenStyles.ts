import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightDark,
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    height: 300,
    backgroundColor: Colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

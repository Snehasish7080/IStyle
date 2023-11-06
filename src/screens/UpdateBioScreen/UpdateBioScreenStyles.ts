import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  inputBox: {
    width: horizontalScale(302),
    height: 110,
  },
  saveBtn: {
    height: 56,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(302),
    borderRadius: 16,
    borderColor: Colors.bottomBorderDark,
    marginTop: 20,
  },
});

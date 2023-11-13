import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  bodyContainer: {
    padding: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderWidth: 0.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
  },
  inputBox: {
    width: horizontalScale(302),
    height: 56,
  },
});

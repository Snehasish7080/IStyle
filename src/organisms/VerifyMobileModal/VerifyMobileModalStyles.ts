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
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  title: {
    fontSize: 18,
    fontFamily: FontFamily.LatoBold,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 26,
  },
  inputBox: {
    width: horizontalScale(302),
    height: 56,
  },
});

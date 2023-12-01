import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontFamily: FontFamily.LatoBold,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 14,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    zIndex: 1,
    left: 20,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark,
  },
});

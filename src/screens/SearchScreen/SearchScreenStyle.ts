import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontFamily: FontFamily.LatoBold,
    color: Colors.dark,
  },
});

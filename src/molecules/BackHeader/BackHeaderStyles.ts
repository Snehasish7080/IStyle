import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    width: '100%',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 0.3,
  },
  backBtn: {
    height: '100%',
    justifyContent: 'center',
  },
  headerText: {textAlign: 'center', flex: 1, fontFamily: FontFamily.LatoBold},
});

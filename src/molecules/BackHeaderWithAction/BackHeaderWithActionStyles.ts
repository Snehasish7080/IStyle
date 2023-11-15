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
    justifyContent: 'space-between',
  },
  backBtn: {
    height: '100%',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: FontFamily.LatoBold,
    flex: 1,
    marginLeft: horizontalScale(30),
    textAlign: 'center',
  },
  actionBtn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginLeft: 16,
  },
  actionText: {
    fontFamily: FontFamily.LatoBold,
  },
});

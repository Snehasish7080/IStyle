import {StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  mainContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    zIndex: 10,
    backgroundColor: Colors.white,
  },
  rightSection: {
    flexDirection: 'row',
    width: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90,
  },
  logoTitle: {
    fontSize: 19,
    fontFamily: FontFamily.SatisfyRegular,
    color: Colors.dark,
  },
});

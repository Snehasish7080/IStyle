import {ScaledSheet} from 'react-native-size-matters';
import {getFontSize} from '../../utils/getFontSize';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = ScaledSheet.create({
  mainContainer: {
    height: '50@vs',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    justifyContent: 'space-between',
    zIndex: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.containerBackground,
  },
  rightSection: {
    flexDirection: 'row',
    width: '60@s',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90@s',
  },
  logoTitle: {
    fontSize: getFontSize(19),
    fontFamily: FontFamily.SatisfyRegular,
    color: Colors.dark,
  },
});

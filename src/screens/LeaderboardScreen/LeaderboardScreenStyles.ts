import {ScaledSheet} from 'react-native-size-matters';
import {getFontSize} from '../../utils/getFontSize';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = ScaledSheet.create({
  mainContainer: {
    // paddingHorizontal: '16@s',
    // backgroundColor: Colors.white,
  },
  trendingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: '30@vs',
    paddingHorizontal: '16@s',
  },
  trendingUser: {
    position: 'relative',
    height: '100@vs',
    borderTopLeftRadius: '30@s',
    borderTopRightRadius: '30@s',
    width: '100@s',
  },

  trendingUserName: {
    fontSize: getFontSize(14),
    fontFamily: FontFamily.LatoBold,
  },
  userProfile: {
    width: '50@s',
    height: '50@s',
    borderRadius: '25@s',
    position: 'absolute',
    alignSelf: 'center',
    top: '-20@vs',
  },
});

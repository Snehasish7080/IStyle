import {ScaledSheet} from 'react-native-size-matters';
import {getFontSize} from '../../utils/getFontSize';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = ScaledSheet.create({
  mainContainer: {
    paddingHorizontal: '16@s',
  },
  heading: {
    fontSize: getFontSize(18),
    fontFamily: FontFamily.KalamRegular,
  },

  header: {
    backgroundColor: Colors.white,
    height: '60@vs',
    paddingHorizontal: '16@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.containerBackground,
  },
  leaderboaderCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: '16@s',
    paddingVertical: '16@vs',
    borderRadius: '20@s',
    height: '70@vs',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: '50@s',
    height: '50@s',
    borderRadius: '25@s',
  },
  profileImageContainer: {
    borderRadius: '60@s',
    position: 'relative',
    width: '54@s',
    height: '54@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numbers: {
    fontSize: 14,
    fontFamily: FontFamily.OswaldRegular,
    width: '30@s',
  },
  userContainer: {
    marginLeft: '16@s',
  },
  userName: {
    fontSize: getFontSize(14),
    fontFamily: FontFamily.LatoBold,
  },
  userFullName: {
    fontSize: getFontSize(12),
    fontFamily: FontFamily.LatoRegular,
    color: Colors.placeholder,
  },
  followerTitle: {
    fontSize: getFontSize(10),
  },
  followerCount: {
    fontSize: getFontSize(12),
    fontFamily: FontFamily.LatoBold,
  },
  scoreCount: {
    fontSize: getFontSize(12),
    fontFamily: FontFamily.LatoBold,
    color: Colors.topStylistSecondary,
  },
  followerContainer: {
    alignItems: 'center',
    marginLeft: '10@s',
  },
  leaderDetailContainer: {
    flexDirection: 'row',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

import {ScaledSheet} from 'react-native-size-matters';
import {getFontSize} from '../../utils/getFontSize';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: '16@s',
    paddingVertical: '16@s',
  },
  image: {
    width: '100%',
    height: '280@s',
    borderRadius: 20,
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@vs',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: '30@s',
    height: '30@s',
    borderRadius: 20,
    marginRight: '10@s',
  },
  userName: {
    fontSize: getFontSize(12),
    fontFamily: FontFamily.LatoBold,
  },
  followBtn: {
    paddingHorizontal: '20@s',
    paddingVertical: '5@vs',
    borderRadius: '5@s',
    // backgroundColor: Colors.containerBackground,
  },
  icon: {
    width: '30@s',
    height: '30@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15@s',
  },
  count: {
    fontSize: getFontSize(14),
    fontFamily: FontFamily.LatoBlack,
    color: Colors.offWhite,
  },
  iconCountContainer: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: '10@vs',
  },
  link: {
    width: '30@s',
    height: '30@s',
    borderRadius: '15@s',
    marginRight: '10@s',
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: '10@vs',
  },
  trendCount: {
    fontSize: getFontSize(11),
    color: Colors.placeholder,
  },
  bullet: {
    fontSize: getFontSize(11),
    color: Colors.placeholder,
    marginHorizontal: 4,
  },
  countContainer: {
    flexDirection: 'row',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkScrollView: {
    width: '100@s',
    backgroundColor: Colors.containerBackground,
    paddingLeft: '6@s',
    borderTopLeftRadius: '30@s',
    borderBottomLeftRadius: '30@s',
    paddingVertical: '4@vs',
  },
});

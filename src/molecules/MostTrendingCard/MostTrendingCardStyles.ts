import {ScaledSheet} from 'react-native-size-matters';
import {getFontSize} from '../../utils/getFontSize';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: '100@s',
    height: '150@vs',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    flex: 1,
  },
  userContainer: {
    height: '40@vs',
    backgroundColor: Colors.dark,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '5@vs',
  },
  profile: {
    width: '30@s',
    height: '30@s',
    borderRadius: '15@s',
  },
  profileContainer: {
    borderRadius: '20@s',
    position: 'absolute',
    alignSelf: 'center',
    top: '-15@vs',
    backgroundColor: Colors.white,
    padding: '2@s',
  },
  userName: {
    color: Colors.white,
    fontSize: getFontSize(12),
    fontFamily: FontFamily.LatoBold,
    textAlign: 'center',
  },
});

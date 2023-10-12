import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  inputBox: {
    width: horizontalScale(302),
    height: 56,
    marginBottom: 30,
  },
  logoTitle: {
    fontSize: 40,
    marginBottom: 80,
    fontFamily: FontFamily.SatisfyRegular,
  },
  notRegistered: {
    fontSize: 14,
    marginRight: 10,
  },
  notRegisteredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  signUp: {
    color: Colors.primaryLight,
    fontFamily: FontFamily.LatoBold,
  },
});

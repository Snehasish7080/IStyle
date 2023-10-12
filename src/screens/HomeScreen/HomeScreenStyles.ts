import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 35,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tagLine: {
    fontFamily: FontFamily.LatoBold,
    fontSize: 18,
  },
  goTagLine: {
    fontFamily: FontFamily.LatoBold,
    fontSize: 18,
    color: Colors.primaryLight,
    marginTop: 5,
  },
});

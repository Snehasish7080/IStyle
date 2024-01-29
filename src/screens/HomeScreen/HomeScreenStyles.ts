import {StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  tagLineContainer: {
    paddingTop: 20,
    paddingBottom: 30,
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

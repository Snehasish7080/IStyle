import {Dimensions, StyleSheet} from 'react-native';
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
    backgroundColor: Colors.containerBackground,
    borderRadius: 35,
    overflow: 'hidden',
    // flex: 1,
    height: Dimensions.get('window').height - 72,
  },
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

import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  infoContainer: {
    marginTop: 30,
    width: '100%',
  },
  info: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.3,
    borderColor: Colors.bottomBorderDark,
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: FontFamily.LatoBold,
    width: 100,
  },
  infoContent: {
    flex: 1,
  },
  editPic: {
    textAlign: 'center',
    color: Colors.link,
    marginTop: 10,
  },
});

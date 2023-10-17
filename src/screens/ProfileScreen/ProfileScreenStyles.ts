import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 20,
  },
  infoBox: {
    width: 80,
    alignItems: 'center',
  },
  infoTitle: {
    marginTop: 4,
    fontSize: 14,
  },
  infoCount: {
    fontFamily: FontFamily.LatoBold,
    fontSize: 14,
  },
  trending: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  tendingCount: {
    fontFamily: FontFamily.LatoBold,
    fontSize: 16,
    color: Colors.primaryLight,
    marginRight: 5,
  },
  tendingTitle: {
    fontFamily: FontFamily.LatoBold,
    fontSize: 14,
    marginLeft: 5,
  },
  trendingImage: {
    width: 80,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
  },
  styleImage: {
    height: horizontalScale(250),
    width: horizontalScale(152),
    borderRadius: 25,
    resizeMode: 'cover',
  },
});

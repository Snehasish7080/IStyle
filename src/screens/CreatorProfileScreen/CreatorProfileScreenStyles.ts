import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  mainContainer: {
    paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    height: Dimensions.get('window').width / 3.6,
    // width: horizontalScale(152),
    width: Dimensions.get('window').width / 3.6,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  separator: {
    width: 100,
    height: 1,
    backgroundColor: Colors.lightDark,
  },
  separatorText: {
    fontSize: 12,
    fontFamily: FontFamily.KalamLight,
    paddingHorizontal: 10,
  },
  nameContainer: {
    marginTop: 15,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  userName: {
    fontFamily: FontFamily.LatoBold,
  },
  desc: {
    fontSize: 12,
    marginTop: 10,
  },
  buttonContainer: {
    marginLeft: 20,
  },
  editBtn: {
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
  },
  editText: {
    fontFamily: FontFamily.LatoBold,
  },
});

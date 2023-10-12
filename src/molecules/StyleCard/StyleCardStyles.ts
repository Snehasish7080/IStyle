import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

const width = horizontalScale(320);
const height = horizontalScale(320);

export const styles = StyleSheet.create({
  mainContainer: {},
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 12,
    fontFamily: FontFamily.LatoBold,
  },
  followBtn: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginBottom: 5,
  },
  count: {
    fontSize: 14,
    fontFamily: FontFamily.LatoBlack,
    color: Colors.offWhite,
  },
  iconCountContainer: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  link: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 10,
  },
});

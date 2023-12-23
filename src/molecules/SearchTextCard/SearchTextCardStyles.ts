import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  userPic: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 5,
  },
  searchText: {
    fontSize: 12,
    fontFamily: FontFamily.LatoBold,
  },
  userEmptyPic: {
    borderWidth: 1,
    width: 35,
    height: 35,
    borderRadius: 25,
    borderColor: Colors.dark,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

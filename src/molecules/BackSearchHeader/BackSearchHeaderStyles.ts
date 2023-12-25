import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    width: '100%',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    height: '100%',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
    fontFamily: FontFamily.LatoBold,
  },
  searchBox: {
    backgroundColor: Colors.textInputBackground,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 15,
    borderColor: Colors.dark,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    flex: 1,
  },
  search: {
    color: Colors.placeholder,
    marginLeft: 10,
  },
});

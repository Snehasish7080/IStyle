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
    backgroundColor: Colors.white,
    borderRadius: 35,
    overflow: 'hidden',
    height: Dimensions.get('window').height - 72,
    // flex: 1,
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
  },
  search: {
    color: Colors.placeholder,
    marginLeft: 10,
  },
  listContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tag: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.dark,
    borderWidth: 1,
    borderColor: Colors.dark,
    marginRight: 5,
  },
  tagText: {
    color: Colors.white,
    fontSize: 12,
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
});

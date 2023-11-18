import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    padding: 16,
  },
  searchBox: {
    backgroundColor: Colors.textInputBackground,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 15,
    borderColor: Colors.dark,
    alignItems: 'center',
    flexDirection: 'row',
  },
  search: {
    color: Colors.placeholder,
    marginLeft: 10,
  },
  tagListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tagList: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.dark,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTag: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.dark,
    marginRight: 10,
    position: 'relative',
  },
  tag: {
    fontFamily: FontFamily.LatoBold,
    fontSize: 12,
  },
  input: {
    color: Colors.black,
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  remove: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    top: -5,
    right: -5,
    backgroundColor: Colors.white,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 0,
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

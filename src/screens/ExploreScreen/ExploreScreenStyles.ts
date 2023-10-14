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
    marginBottom: 20,
  },
  search: {
    color: Colors.placeholder,
    marginLeft: 10,
  },
});

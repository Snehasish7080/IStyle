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
  },
});

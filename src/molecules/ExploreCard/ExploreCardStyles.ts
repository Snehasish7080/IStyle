import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

const width = horizontalScale(Dimensions.get('window').width / 2.5);

export const styles = StyleSheet.create({
  mainContainer: {},
  image: {
    width: width,
    resizeMode: 'cover',
    borderRadius: 25,
  },
});

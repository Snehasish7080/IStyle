import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

const width = horizontalScale(Dimensions.get('window').width / 2.4);

export const styles = StyleSheet.create({
  mainContainer: {},
  image: {
    resizeMode: 'cover',
    borderRadius: 25,
    width: null,
  },
});

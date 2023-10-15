import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  imageContainer: {
    backgroundColor: Colors.white,
    borderRadius: 35,
    height: Dimensions.get('window').height - 72,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height - 72,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    zIndex: 1,
    left: 20,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  link: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 10,
  },
});

import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').height - 72,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
    height: 60,
    top: 0,
    zIndex: 10,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
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
  linkContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLinkContainer: {
    bottom: 100,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    left: 30,
  },
  addLink: {
    fontSize: 12,
    fontFamily: FontFamily.LatoBold,
    marginLeft: 10,
  },
  mainLinkContainer: {
    marginLeft: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    maxHeight: 220,
    borderRadius: 20,
    width: 80,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});

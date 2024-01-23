import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/theme';

export const styles = StyleSheet.create({
  mainContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.black,
    position: 'absolute',
    bottom: 0,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: Colors.black,
    marginTop: 1,
  },
  tab: {
    alignItems: 'center',
    height: 35,
    width: 35,
    justifyContent: 'center',
    borderRadius: 19,
  },
});

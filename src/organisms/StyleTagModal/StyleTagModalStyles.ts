import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/scale';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightDark,
    flex: 1,
    justifyContent: 'flex-end',
  },

  modal: {
    height: 700,
    backgroundColor: Colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  tagListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
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
  tag: {
    fontFamily: FontFamily.LatoBold,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  subTitle: {
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 14,
    textAlign: 'center',
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

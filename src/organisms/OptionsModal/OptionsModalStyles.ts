import {ScaledSheet} from 'react-native-size-matters';
import {getFontSize} from '../../utils/getFontSize';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: Colors.modalBackground,
    paddingHorizontal: '16@s',
    paddingVertical: '16@s',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBody: {
    width: '100%',
    height: '220@vs',
    backgroundColor: Colors.white,
    borderRadius: '20@s',
    padding: '16@s',
  },
  gesture: {
    width: '50@s',
    height: '2@vs',
    backgroundColor: Colors.placeholder,
    borderRadius: '2@vs',
    marginBottom: '15@vs',
    alignSelf: 'center',
  },
  pressable: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.containerBackground,
    borderRadius: '20@s',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '10@s',
    paddingVertical: '10@vs',
    borderBlockColor: Colors.sectionBorder,
    borderBottomWidth: 1,
  },
  info: {
    fontSize: getFontSize(12),
    color: Colors.dark,
    fontFamily: FontFamily.LatoBold,
    marginLeft: '8@s',
  },
});

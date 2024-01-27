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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: FontFamily.LatoBold,
    textAlign: 'center',
    flex: 1,
  },
  textInput: {
    marginTop: '12@vs',
    fontFamily: FontFamily.LatoRegular,
    fontSize: 14,
  },
  shareBtn: {
    marginTop: '26@vs',
  },
});

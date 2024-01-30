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
    height: '520@vs',
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
    overflow: 'hidden',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: '10@s',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
    marginRight: '10@s',
  },
  userName: {
    fontSize: 12,
    fontFamily: FontFamily.LatoBold,
  },
});

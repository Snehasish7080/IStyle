import {ScaledSheet} from 'react-native-size-matters';
import {getFontSize} from '../../utils/getFontSize';
import {Colors, FontFamily} from '../../utils/theme';

export const styles = ScaledSheet.create({
  mainContainer: {
    paddingHorizontal: '16@s',
  },
  trendingContainer: {
    alignItems: 'center',
    paddingVertical: '16@vs',
  },
  trendingImage: {
    width: '200@s',
    height: '200@s',
    borderRadius: '20@s',
  },
});

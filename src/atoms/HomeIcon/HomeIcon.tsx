import {
  BlendMode,
  Canvas,
  fitbox,
  Group,
  ImageSVG,
  rect,
  Skia,
} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import {Colors} from '../../utils/theme';

type HomeIconProps = {
  isFocused?: boolean;
};

const Icon = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5.5 15.0625H14.5M9.30457 1.21117L1.50457 6.48603C1.18802 6.7001 1 7.04666 1 7.41605V17.2882C1 18.2336 1.80589 19 2.8 19H17.2C18.1941 19 19 18.2336 19 17.2882V7.41605C19 7.04665 18.812 6.7001 18.4954 6.48603L10.6954 1.21117C10.2791 0.92961 9.72092 0.929609 9.30457 1.21117Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
)!;

const HomeIcon: React.FC<HomeIconProps> = ({isFocused}) => {
  const src = rect(0, 0, 20, 20);
  const dst = rect(0, 0, 16, 16);

  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.placeholder), BlendMode.SrcIn),
  );
  const focusedPaint = useMemo(() => Skia.Paint(), []);
  focusedPaint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.dark), BlendMode.SrcIn),
  );
  return (
    <Canvas style={{width: 20, height: 20}}>
      <Group
        layer={isFocused ? focusedPaint : paint}
        transform={fitbox('contain', src, dst)}>
        <ImageSVG svg={Icon} x={0} y={0} width={20} height={20} />
      </Group>
    </Canvas>
  );
};

export default HomeIcon;

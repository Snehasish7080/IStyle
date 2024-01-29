import {
  BlendMode,
  Canvas,
  fitbox,
  Group,
  ImageSVG,
  LinearGradient,
  Path,
  rect,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import {Colors} from '../../utils/theme';

const Icon = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M21 14L12 20L3 14M21 10L12 16L3 10L12 4L21 10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
)!;

type ExploreIconProps = {
  isFocused?: boolean;
};
const ExploreIcon: React.FC<ExploreIconProps> = ({isFocused}) => {
  const src = rect(0, 0, 24, 24);
  const dst = rect(0, 0, 20, 20);

  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.placeholder), BlendMode.SrcIn),
  );
  const emptyPaint = useMemo(() => Skia.Paint(), []);
  emptyPaint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.dark), BlendMode.SrcIn),
  );
  return (
    <Canvas style={{width: 24, height: 24}}>
      <Group
        layer={isFocused ? emptyPaint : paint}
        transform={fitbox('contain', src, dst)}>
        <ImageSVG svg={Icon} x={0} y={0} width={20} height={20} />
      </Group>
    </Canvas>
  );
};

export default ExploreIcon;

import {
  BlendMode,
  Canvas,
  fitbox,
  Group,
  ImageSVG,
  LinearGradient,
  Mask,
  Rect,
  rect,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import {Colors} from '../../utils/theme';

const Icon = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 7.69431C10 2.99988 3 3.49988 3 9.49991C3 15.4999 12 20.5001 12 20.5001C12 20.5001 21 15.4999 21 9.49991C21 3.49988 14 2.99988 12 7.69431Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
)!;

type HeartIconProps = {
  isMarked?: boolean;
};
const HeartIcon: React.FC<HeartIconProps> = ({isMarked = false}) => {
  const src = rect(0, 0, 24, 24);
  const dst = rect(0, 0, 20, 20);

  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.dark), BlendMode.SrcIn),
  );

  return (
    <Canvas style={{width: 20, height: 20}}>
      {!isMarked && (
        <Group layer={paint} transform={fitbox('contain', src, dst)}>
          <ImageSVG svg={Icon} x={0} y={0} width={20} height={20} />
        </Group>
      )}
      {isMarked && (
        <Mask
          mask={
            <Group layer={paint} transform={fitbox('contain', src, dst)}>
              <ImageSVG svg={Icon} x={0} y={0} width={20} height={20} />
            </Group>
          }>
          <Rect x={0} y={0} width={20} height={20}>
            <LinearGradient
              start={vec(0, 20)}
              end={vec(10, -10)}
              colors={[Colors.secondary, Colors.primary]}
            />
          </Rect>
        </Mask>
      )}
    </Canvas>
  );
};

export default HeartIcon;

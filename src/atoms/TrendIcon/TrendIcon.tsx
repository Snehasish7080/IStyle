import {
  BlendMode,
  Canvas,
  Fill,
  fitbox,
  Group,
  ImageSVG,
  LinearGradient,
  Mask,
  Path,
  Rect,
  rect,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import {Colors} from '../../utils/theme';

const tIcon = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20.0005 7L14.1543 12.9375C14.0493 13.0441 13.9962 13.0976 13.9492 13.1396C13.1899 13.8193 12.0416 13.8193 11.2822 13.1396C11.2352 13.0976 11.1817 13.0442 11.0767 12.9375C10.9716 12.8308 10.9191 12.7774 10.8721 12.7354C10.1127 12.0557 8.96397 12.0557 8.20461 12.7354C8.15771 12.7773 8.10532 12.8305 8.00078 12.9367L4 17M20.0005 7L20 13M20.0005 7H14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
)!;

const TrendIcon = () => {
  const src = rect(0, 0, 24, 24);
  const dst = rect(0, 0, 23, 24);

  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.dark), BlendMode.SrcIn),
  );

  return (
    <Canvas style={{width: 24, height: 24}}>
      <Mask
        mask={
          <Group layer={paint} transform={fitbox('contain', src, dst)}>
            <ImageSVG svg={tIcon} x={0} y={0} width={20} height={20} />
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
    </Canvas>
  );
};

export default TrendIcon;

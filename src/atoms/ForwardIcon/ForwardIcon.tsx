import {
  BlendMode,
  Canvas,
  Group,
  ImageSVG,
  Skia,
} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {Colors} from '../../utils/theme';

const Icon = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M7 12H17M17 12L13 8M17 12L13 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
)!;

const ForwardIcon = () => {
  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.dark), BlendMode.SrcIn),
  );

  return (
    <Canvas
      style={{
        width: 24,
        height: 24,
      }}>
      <Group layer={paint}>
        <ImageSVG svg={Icon} x={0} y={0} />
      </Group>
    </Canvas>
  );
};

export default ForwardIcon;

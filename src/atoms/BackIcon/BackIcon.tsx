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
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13" fill="none">
    <path d="M12.5 6.49976H2M5.49976 1.5L1 6.49976L5.49976 11.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
)!;

const BackIcon = () => {
  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.dark), BlendMode.SrcIn),
  );

  return (
    <Canvas
      style={{
        width: 14,
        height: 13,
      }}>
      <Group layer={paint}>
        <ImageSVG svg={Icon} x={0} y={0} width={14} height={13} />
      </Group>
    </Canvas>
  );
};

export default BackIcon;

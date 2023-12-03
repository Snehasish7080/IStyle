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
  <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
)!;

type ProfileIconProps = {
  isFocused?: boolean;
  color?: string;
};

const ProfileIcon: React.FC<ProfileIconProps> = ({
  isFocused,
  color = Colors.white,
}) => {
  const src = rect(0, 0, 24, 24);
  const dst = rect(0, 0, 24, 24);
  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(color), BlendMode.SrcIn),
  );
  const emptyPaint = useMemo(() => Skia.Paint(), []);
  emptyPaint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(color), BlendMode.SrcIn),
  );
  return (
    <Canvas style={{width: 24, height: 24}}>
      <Group layer={paint} transform={fitbox('contain', src, dst)}>
        <ImageSVG svg={Icon} x={0} y={0} width={20} height={20} />
      </Group>
    </Canvas>
  );
};

export default ProfileIcon;

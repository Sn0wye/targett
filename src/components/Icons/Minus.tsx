import { SvgXml } from 'react-native-svg';

interface MinusProps {
  color?: string;
  size?: number;
}

export function Minus({ color = '#fff', size = 16 }: MinusProps) {
  const markup = `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="${color}" d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"/></svg>`;

  return <SvgXml xml={markup} />;
}

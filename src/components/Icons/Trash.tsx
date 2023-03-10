import { SvgXml } from 'react-native-svg';

interface TrashProps {
  color?: string;
  size?: number;
}

export function Trash({ color = '#fff', size = 24 }: TrashProps) {
  const markup = `<svg width="${size}" height="${size}" viewBox="0 0 256 256">
  <path
    fill="${color}"
    d="M216 48h-40v-8a24.1 24.1 0 0 0-24-24h-48a24.1 24.1 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"
  />
</svg>`;

  return <SvgXml xml={markup} />;
}

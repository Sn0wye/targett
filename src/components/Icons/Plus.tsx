import { SvgXml } from "react-native-svg";

interface PlusProps {
  color?: string;
  size?: number;
}

export function Plus({ color = "#fff", size = 16 }: PlusProps) {
  const markup = `<svg width="${size}" height="${size}" viewBox="0 0 24 24">
  <path
    fill="${color}"
    d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
  />
</svg>`;

  return <SvgXml xml={markup} />;
}

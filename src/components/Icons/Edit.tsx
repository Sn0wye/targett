import { SvgXml } from 'react-native-svg';

interface EditProps {
  color?: string;
  size?: number;
}

export function Edit({ color = '#fff', size = 16 }: EditProps) {
  const markup = `<svg width='${size}' height='${size}' viewBox='0 0 24 24'>
      <path
        fill='${color}'
        d='m15 16l-4 4h8c1.1 0 2-.9 2-2s-.9-2-2-2h-4zm-2.94-8.81l-8.77 8.77c-.18.18-.29.44-.29.7V19c0 .55.45 1 1 1h2.34c.27 0 .52-.11.71-.29l8.77-8.77l-3.76-3.75zm6.65.85a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z'
      />
    </svg>`;
  return <SvgXml xml={markup} />;
}

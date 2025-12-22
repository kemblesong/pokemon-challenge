import { TYPE_COLORS, getTypeTextColor } from '../constants/typeColors';
import type { TypeName } from '../types/pokemon';

interface TypeBadgeProps {
  type: TypeName;
  multiplier?: number;
}

export function TypeBadge({ type, multiplier }: TypeBadgeProps) {
  const backgroundColor = TYPE_COLORS[type];
  const color = getTypeTextColor(type);

  return (
    <span
      className="type-badge"
      style={{ backgroundColor, color }}
    >
      {type}
      {multiplier !== undefined && multiplier !== 1 && (
        <span style={{ marginLeft: '0.25rem', opacity: 0.8 }}>
          {multiplier > 1 ? `${multiplier}x` : `${multiplier}x`}
        </span>
      )}
    </span>
  );
}

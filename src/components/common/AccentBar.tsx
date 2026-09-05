export type AccentColor = 'green' | 'orange' | 'red' | 'purple' | 'blue' | 'yellow';

const colorMap: Record<AccentColor, string> = {
  green: 'bg-success',
  orange: 'bg-secondary',
  red: 'bg-error',
  purple: 'bg-purple',
  blue: 'bg-blue',
  yellow: 'bg-warning',
};

export function AccentBar({ color }: { color: AccentColor }) {
  return <div className={`w-1 self-stretch rounded-full ${colorMap[color]}`} />;
}

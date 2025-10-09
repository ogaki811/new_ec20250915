import Icon from '@/components/ui/Icon';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    trend: 'text-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    trend: 'text-green-600',
  },
  yellow: {
    bg: 'bg-yellow-50',
    icon: 'text-yellow-600',
    trend: 'text-yellow-600',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    trend: 'text-red-600',
  },
};

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  color = 'blue',
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <Icon
                name={trend.isPositive ? 'arrowUp' : 'arrowDown'}
                size={16}
                className={trend.isPositive ? 'text-green-600' : 'text-red-600'}
              />
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">前月比</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon name={icon} size={32} className={colors.icon} />
        </div>
      </div>
    </div>
  );
}

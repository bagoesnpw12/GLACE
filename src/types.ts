export interface ActivityItem {
  id: string;
  time: string;
  activity: string;
  module: string;
  status: 'Success' | 'Pending';
  iconType: 'document' | 'asset' | 'rfq' | 'academy' | 'wbs';
}

export interface MetricCard {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export interface MonthlyProjectStat {
  month: string;
  count: number;
}

export interface StatusDistribution {
  name: string;
  count: number;
  color: string;
}

export interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  iconName: string;
  status?: 'In development' | 'Active';
  colorBg: string;
  iconColor: string;
}


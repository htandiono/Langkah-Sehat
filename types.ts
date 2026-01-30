export interface UserStats {
  steps: number;
  calories: number;
  distance: number; // in km
  rank: number;
  avatar: string;
  name: string;
  role: string;
  level: number;
  streak?: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  role: string;
  steps: number;
  avatar: string;
  id: string;
  isCurrentUser?: boolean;
}

export interface TeamLeaderboardEntry {
  rank: number;
  name: string;
  memberCount: number;
  averageSteps: number;
  avatar: string; // Team logo URL
  id: string;
}

export type TabView = 'dashboard' | 'statistics' | 'leaderboard' | 'profile' | 'edit-profile' | 'daily-target';
export type LeaderboardType = 'individu' | 'tim';
export type TimeRange = 'harian' | 'mingguan' | 'bulanan';

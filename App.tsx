import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import DailyTarget from './components/DailyTarget';
import { UserStats, LeaderboardEntry, TeamLeaderboardEntry, TabView } from './types';
import { Home, BarChart2, Trophy, User } from 'lucide-react';

// Mock Data
const MOCK_USER: UserStats = {
  steps: 5420,
  calories: 324,
  distance: 4.2,
  rank: 42,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  name: 'Rizky Fajar',
  role: 'Product Design Team',
  level: 12,
  streak: 14
};

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', rank: 1, name: 'Sarah Miller', role: 'Sales Lead', steps: 12502, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { id: '2', rank: 2, name: 'Budi Santoso', role: 'Dev Lead', steps: 8942, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80' },
  { id: '3', rank: 3, name: 'Dimas Anggara', role: 'Designer', steps: 7821, avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80' },
  { id: '4', rank: 4, name: 'Rina Kartika', role: 'Marketing Lead', steps: 6940, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { id: '5', rank: 5, name: 'Agus Setiawan', role: 'Developer', steps: 6820, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
  { id: '6', rank: 6, name: 'Maya Putri', role: 'HR Division', steps: 6450, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
  { id: '7', rank: 7, name: 'Reza Rahardian', role: 'Design', steps: 6100, avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&q=80' },
  { id: '8', rank: 8, name: 'Sinta Dewi', role: 'Finance', steps: 5900, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80' },
  { id: '42', rank: 42, name: 'Rizky Fajar', role: 'Product', steps: 5420, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', isCurrentUser: true },
];

const MOCK_TEAMS: TeamLeaderboardEntry[] = [
  { id: 't1', rank: 1, name: 'Engineering', memberCount: 12, averageSteps: 14250, avatar: 'https://cdn-icons-png.flaticon.com/512/3067/3067451.png' },
  { id: 't2', rank: 2, name: 'Product Team', memberCount: 8, averageSteps: 12800, avatar: 'https://cdn-icons-png.flaticon.com/512/1256/1256628.png' },
  { id: 't3', rank: 3, name: 'Sales Force', memberCount: 24, averageSteps: 11500, avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png' },
  { id: 't4', rank: 4, name: 'Marketing', memberCount: 10, averageSteps: 9800, avatar: 'https://cdn-icons-png.flaticon.com/512/1998/1998087.png' },
  { id: 't5', rank: 5, name: 'HR Division', memberCount: 5, averageSteps: 8200, avatar: 'https://cdn-icons-png.flaticon.com/512/912/912316.png' },
  { id: 't6', rank: 6, name: 'Finance', memberCount: 6, averageSteps: 7500, avatar: 'https://cdn-icons-png.flaticon.com/512/2761/2761118.png' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<TabView>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={MOCK_USER} />;
      case 'leaderboard':
        return (
          <Leaderboard 
            entries={MOCK_LEADERBOARD} 
            teamEntries={MOCK_TEAMS}
            currentUserEntry={MOCK_LEADERBOARD.find(e => e.isCurrentUser)!} 
          />
        );
      case 'statistics':
        return <Statistics user={MOCK_USER} />;
      case 'profile':
        return <Profile user={MOCK_USER} onNavigate={setCurrentView} />;
      case 'edit-profile':
        return <EditProfile user={MOCK_USER} onBack={() => setCurrentView('profile')} />;
      case 'daily-target':
        return <DailyTarget currentTarget={8000} onBack={() => setCurrentView('profile')} />;
      default:
        return <Dashboard user={MOCK_USER} />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: TabView; icon: any; label: string }) => {
    // Determine active state: exact match OR (if we are in a profile sub-page, highlight profile)
    const isActive = currentView === view || (view === 'profile' && ['edit-profile', 'daily-target'].includes(currentView));
    
    return (
      <button 
        onClick={() => setCurrentView(view)}
        className="flex flex-col items-center justify-center w-16 h-full gap-1.5 relative group"
      >
        <div className={`relative flex items-center justify-center w-10 h-10 transition-all duration-300`}>
             {/* Active Indicator Background */}
             {isActive && (
                 <div className="absolute inset-0 bg-gradient-to-br from-[#0055FF] to-[#00AEEF] rounded-lg rotate-45 shadow-[0_0_15px_rgba(0,174,239,0.5)] animate-in fade-in zoom-in duration-300"></div>
             )}
             <Icon 
                size={22} 
                className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`} 
                strokeWidth={isActive ? 2.5 : 2}
             />
        </div>
        <span className={`text-[9px] font-bold tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600'}`}>
            {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen text-white overflow-hidden max-w-md mx-auto shadow-2xl relative bg-[#1e1e1e]">
      
      {/* Decorative Status Bar Area */}
      <div className="h-6 w-full absolute top-0 z-50 pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-[84px] bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 z-40 pb-4 relative">
        {/* Glow behind nav */}
        <div className="absolute -top-10 inset-x-0 h-10 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none"></div>
        
        <NavItem view="dashboard" icon={Home} label="Beranda" />
        <NavItem view="statistics" icon={BarChart2} label="Statistik" />
        <NavItem view="leaderboard" icon={Trophy} label="Klasemen" />
        <NavItem view="profile" icon={User} label="Profil" />
      </nav>

    </div>
  );
};

export default App;

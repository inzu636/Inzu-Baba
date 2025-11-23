import React, { useState } from 'react';
import { Screen, User } from './types';
import Register from './views/Register';
import Home from './views/Home';
import LotteryGame from './views/LotteryGame';
import { Home as HomeIcon, Trophy, Gift, User as UserIcon } from 'lucide-react';

// Mock User Data
const initialUser: User = {
  username: "MEMBERNGG1N5P",
  uid: "8839210",
  phone: "+91 9876543210",
  balance: 300,
  vipLevel: 3,
  lastLogin: "Just now"
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.REGISTER);
  const [user, setUser] = useState<User>(initialUser);

  // Navigation Handlers
  const navigateToHome = () => setCurrentScreen(Screen.HOME);
  const navigateToGame = () => setCurrentScreen(Screen.GAME);
  const navigateToRegister = () => setCurrentScreen(Screen.REGISTER);

  // Bottom Nav Component (Internal to App to share state easily for this structure)
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-white/5 pb-safe pt-2 px-6 z-50">
       <div className="flex justify-between items-center max-w-md mx-auto h-16">
          <button 
            onClick={() => setCurrentScreen(Screen.HOME)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === Screen.HOME ? 'text-yellow-400' : 'text-slate-500'}`}
          >
             <HomeIcon className="w-6 h-6" strokeWidth={currentScreen === Screen.HOME ? 2.5 : 2} />
             <span className="text-[10px] font-medium">Home</span>
          </button>
          
          <button 
            className={`flex flex-col items-center gap-1 transition-colors text-slate-500`}
          >
             <Trophy className="w-6 h-6" />
             <span className="text-[10px] font-medium">Activity</span>
          </button>

          {/* Center Action Button */}
          <div className="relative -top-5">
             <button 
                onClick={() => setCurrentScreen(Screen.GAME)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/40 border-4 border-slate-900 transition-transform active:scale-95"
             >
                <span className="font-bold text-slate-900 text-xs text-center leading-tight">WIN<br/>₹300</span>
             </button>
          </div>

          <button 
             className={`flex flex-col items-center gap-1 transition-colors text-slate-500`}
          >
             <Gift className="w-6 h-6" />
             <span className="text-[10px] font-medium">Promo</span>
          </button>

          <button 
             className={`flex flex-col items-center gap-1 transition-colors text-slate-500`}
          >
             <UserIcon className="w-6 h-6" />
             <span className="text-[10px] font-medium">Account</span>
          </button>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-yellow-500/30">
      
      {currentScreen === Screen.REGISTER && (
        <Register 
          onRegister={navigateToHome} 
          onLoginClick={navigateToHome} // Shortcut for demo
        />
      )}

      {currentScreen === Screen.HOME && (
        <div className="max-w-md mx-auto min-h-screen relative p-4">
          <Home user={user} onNavigateToGame={navigateToGame} />
          <BottomNav />
        </div>
      )}

      {currentScreen === Screen.GAME && (
        <div className="max-w-md mx-auto min-h-screen relative p-4">
           {/* Simple Back Header for Game */}
           <div className="fixed top-0 left-0 w-full z-40 px-4 py-2 pointer-events-none">
             <div className="max-w-md mx-auto">
               {/* Content managed inside view */}
             </div>
           </div>
           
           <LotteryGame onBack={navigateToHome} balance={user.balance} />
           <BottomNav />
        </div>
      )}

    </div>
  );
};

export default App;
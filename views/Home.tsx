import React from 'react';
import { User } from '../types';
import { Card, Badge, Button } from '../components/UI';
import { Wallet, TrendingUp, History, ArrowUpRight, ArrowDownLeft, Crown, Clock } from 'lucide-react';

interface HomeProps {
  user: User;
  onNavigateToGame: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onNavigateToGame }) => {
  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-500">
      
      {/* Profile Header */}
      <div className="flex items-center gap-4 px-2">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-700 p-0.5">
            <img 
              src="https://picsum.photos/200/200" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-2 border-slate-900"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-1">
            <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-wide">{user.username}</h2>
            <Badge>VIP {user.vipLevel}</Badge>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>UID: {user.uid}</span>
            <span>Last Login: {user.lastLogin}</span>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-600 p-6 shadow-2xl shadow-yellow-500/20">
         {/* Decorative circles */}
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
         <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>

         <div className="relative z-10 text-slate-900">
            <div className="text-sm font-bold opacity-80 uppercase tracking-wider mb-1">Total Balance</div>
            <div className="text-4xl font-extrabold mb-6">₹{user.balance.toLocaleString()}</div>
            
            <div className="grid grid-cols-4 gap-2">
              <button className="flex flex-col items-center gap-1 bg-black/20 hover:bg-black/30 p-2 rounded-lg transition-colors backdrop-blur-sm">
                 <Wallet className="w-5 h-5 text-white" />
                 <span className="text-[10px] font-bold text-white">Wallet</span>
              </button>
              <button className="flex flex-col items-center gap-1 bg-black/20 hover:bg-black/30 p-2 rounded-lg transition-colors backdrop-blur-sm">
                 <ArrowUpRight className="w-5 h-5 text-white" />
                 <span className="text-[10px] font-bold text-white">Deposit</span>
              </button>
              <button className="flex flex-col items-center gap-1 bg-black/20 hover:bg-black/30 p-2 rounded-lg transition-colors backdrop-blur-sm">
                 <ArrowDownLeft className="w-5 h-5 text-white" />
                 <span className="text-[10px] font-bold text-white">Withdraw</span>
              </button>
              <button className="flex flex-col items-center gap-1 bg-black/20 hover:bg-black/30 p-2 rounded-lg transition-colors backdrop-blur-sm">
                 <Crown className="w-5 h-5 text-white" />
                 <span className="text-[10px] font-bold text-white">VIP</span>
              </button>
            </div>
         </div>
      </div>

      {/* Safe Box / Promo */}
      <Card className="flex items-center justify-between border-yellow-500/20 bg-gradient-to-r from-slate-800 to-slate-800/50">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500">
               <TrendingUp className="w-6 h-6" />
            </div>
            <div>
               <h3 className="font-bold text-white">Safe Box</h3>
               <p className="text-xs text-slate-400">Daily interest rate up to 0.5%</p>
            </div>
         </div>
         <Button variant="outline" className="w-auto py-2 px-4 text-xs h-auto rounded-lg">Details</Button>
      </Card>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 gap-3">
         {[
           { icon: <Clock className="w-5 h-5" />, label: "Game History" },
           { icon: <ArrowUpRight className="w-5 h-5" />, label: "Transaction History" },
           { icon: <History className="w-5 h-5" />, label: "Deposit History" },
           { icon: <ArrowDownLeft className="w-5 h-5" />, label: "Withdraw History" },
         ].map((item, index) => (
           <Card key={index} className="flex items-center justify-between p-4 hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300 group-hover:text-yellow-400 group-hover:bg-yellow-500/10 transition-colors">
                    {item.icon}
                 </div>
                 <span className="font-medium text-slate-200">{item.label}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600" />
           </Card>
         ))}
      </div>

      {/* Quick Start Game Banner */}
      <div onClick={onNavigateToGame} className="cursor-pointer relative overflow-hidden rounded-2xl bg-slate-800 border border-yellow-500/30 p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent"></div>
        <div className="relative z-10 p-5 flex items-center justify-between">
            <div>
               <h3 className="text-xl font-bold text-white">Win Big Today</h3>
               <p className="text-sm text-yellow-400">Next draw in 1 minute</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/30 animate-pulse-slow">
              <span className="font-bold text-slate-900 text-lg">GO</span>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
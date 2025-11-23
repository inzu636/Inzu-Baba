import React, { useState, useEffect } from 'react';
import { Clock, Trophy, History, Sparkles } from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';
import { getLuckyNumberPrediction } from '../services/geminiService';
import { GameResult } from '../types';

interface LotteryGameProps {
  onBack: () => void;
  balance: number;
}

const LotteryGame: React.FC<LotteryGameProps> = ({ onBack, balance }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gamePeriod, setGamePeriod] = useState(202310240001);
  const [previousResults, setPreviousResults] = useState<GameResult[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleRoundEnd();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gamePeriod]);

  const handleRoundEnd = () => {
    // Generate mock result
    const winningNumber = Math.floor(Math.random() * 50) + 1;
    setPreviousResults(prev => [{
        period: gamePeriod.toString(),
        number: winningNumber,
        timestamp: new Date()
    }, ...prev].slice(0, 5));
    
    setGamePeriod(prev => prev + 1);
    setSelectedNumber(null);
    setBetPlaced(false);
  };

  const handleNumberSelect = (num: number) => {
    if (betPlaced) return;
    setSelectedNumber(num);
  };

  const handlePlaceBet = () => {
    if (selectedNumber) {
        setBetPlaced(true);
        // In a real app, dispatch to backend here
    }
  };

  const askAiForNumber = async () => {
    if (betPlaced) return;
    setIsAiLoading(true);
    const prediction = await getLuckyNumberPrediction();
    setSelectedNumber(prediction.number);
    setIsAiLoading(false);
    // Optionally show the reason in a toast/alert
    // alert(`AI chose ${prediction.number}: ${prediction.reason}`);
  };

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-white">Pick Lucky Number</h1>
           <p className="text-slate-400 text-sm">Win 33x your bet amount!</p>
        </div>
        <div className="text-right">
           <div className="text-xs text-slate-400 uppercase tracking-wide">Current Balance</div>
           <div className="text-xl font-bold text-yellow-400">₹{balance.toLocaleString()}</div>
        </div>
      </div>

      {/* Timer & Period Card */}
      <Card className="mb-6 bg-slate-800/80 backdrop-blur-xl border-yellow-500/10">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="p-2.5 bg-slate-700/50 rounded-xl text-yellow-500">
                  <Clock className={`w-6 h-6 ${timeLeft < 10 ? 'animate-pulse text-red-500' : ''}`} />
               </div>
               <div>
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time Remaining</div>
                  <div className={`text-2xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>
                    00:{timeLeft.toString().padStart(2, '0')}
                  </div>
               </div>
            </div>
            <div className="text-right">
               <div className="text-xs text-slate-400 font-medium">Period</div>
               <div className="text-lg font-mono text-white tracking-widest">{gamePeriod}</div>
            </div>
        </div>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-2 mb-6">
         {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberSelect(num)}
              disabled={betPlaced}
              className={`
                aspect-square rounded-xl font-bold text-sm transition-all duration-200 relative
                ${selectedNumber === num 
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-slate-900 shadow-lg shadow-yellow-500/40 scale-105 z-10' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }
                ${betPlaced ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
               {num}
            </button>
         ))}
      </div>

      {/* Actions */}
      <div className="space-y-4 mb-8">
         <div className="flex gap-4">
             <Button 
                variant="secondary" 
                onClick={askAiForNumber} 
                isLoading={isAiLoading}
                className="flex-1 bg-slate-800 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
                disabled={betPlaced}
              >
                <Sparkles className="w-4 h-4" />
                AI Pick
             </Button>
             
             {selectedNumber && (
                <div className="flex-1 bg-slate-800 rounded-xl p-3 flex justify-between items-center border border-white/5">
                   <span className="text-xs text-slate-400">Win Amount</span>
                   <span className="text-lg font-bold text-yellow-400">₹1650</span>
                </div>
             )}
         </div>

         <Button 
            disabled={!selectedNumber || betPlaced} 
            onClick={handlePlaceBet}
            className="shadow-xl shadow-yellow-500/10"
          >
            {betPlaced ? 'Bet Placed - Good Luck!' : `Place Bet ₹50 on #${selectedNumber || '?'}`}
         </Button>
      </div>

      {/* Previous Results */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
           <History className="w-4 h-4 text-slate-400" />
           <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Previous Results</h3>
        </div>
        
        <div className="space-y-2">
          {previousResults.length === 0 ? (
             <div className="text-center py-8 text-slate-500 text-sm italic">Waiting for results...</div>
          ) : (
            previousResults.map((res) => (
              <div key={res.period} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl border border-white/5">
                 <span className="font-mono text-xs text-slate-400">{res.period}</span>
                 <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">Winner</span>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 text-slate-900 font-bold flex items-center justify-center text-sm">
                       {res.number}
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default LotteryGame;
import React, { useState } from 'react';
import { Smartphone, Lock, ShieldCheck, Mail, Users, ArrowRight } from 'lucide-react';
import { Button, Input } from '../components/UI';
import { Screen } from '../types';

interface RegisterProps {
  onRegister: () => void;
  onLoginClick: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onLoginClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onRegister();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-slate-900 to-slate-900 -z-10" />
      
      <div className="w-full max-w-md space-y-8">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-block p-4 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/20 mb-4">
            <ShieldCheck className="w-10 h-10 text-slate-900" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white">
            LuxBet Royale
          </h1>
          <p className="text-slate-400 text-sm">Premium Lottery & Gaming Platform</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-white text-lg font-semibold border-l-4 border-yellow-500 pl-3">Register your Phone</h2>
          </div>

          <div className="flex gap-3">
             <div className="w-24 shrink-0">
                <Input 
                   value="+91" 
                   readOnly 
                   className="text-center bg-slate-800"
                />
             </div>
             <Input 
                placeholder="Phone Number" 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Smartphone className="w-4 h-4" />}
                required
             />
          </div>

          <Input 
            placeholder="Verification Code" 
            type="text"
            leftIcon={<Mail className="w-4 h-4" />}
            rightElement={
              <button type="button" className="text-xs font-bold text-yellow-500 hover:text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-lg transition-colors">
                Send Code
              </button>
            }
          />

          <Input 
            placeholder="Set Password" 
            type="password"
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Input 
            placeholder="Confirm Password" 
            type="password"
            leftIcon={<Lock className="w-4 h-4" />}
          />

           <Input 
            placeholder="Invite Code (Optional)" 
            type="text"
            leftIcon={<Users className="w-4 h-4" />}
          />

          <label className="flex items-center gap-3 text-xs text-slate-400 cursor-pointer group">
            <div className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center group-hover:border-yellow-500 transition-colors">
              <input type="checkbox" className="accent-yellow-500 w-4 h-4" required />
            </div>
            I have read and agree to the <span className="text-yellow-500 underline">Privacy Agreement</span>
          </label>

          <Button type="submit" isLoading={isLoading} className="mt-6">
            Register Now
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="text-center pt-4">
             <button type="button" onClick={onLoginClick} className="text-sm text-slate-400 hover:text-white transition-colors">
               Already have an account? <span className="text-yellow-400 font-bold">Login</span>
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
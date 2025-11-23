export enum Screen {
  REGISTER = 'REGISTER',
  HOME = 'HOME',
  GAME = 'GAME'
}

export interface User {
  username: string;
  uid: string;
  phone: string;
  balance: number;
  vipLevel: number;
  lastLogin: string;
}

export interface BetHistory {
  id: string;
  period: string;
  number: number;
  amount: number;
  winAmount: number;
  status: 'pending' | 'won' | 'lost';
  timestamp: Date;
}

export interface GameResult {
  period: string;
  number: number;
  timestamp: Date;
}
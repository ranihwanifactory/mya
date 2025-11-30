import React from 'react';
import { Cpu, Menu } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate && onNavigate('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">MYA</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate && onNavigate('home')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">홈</button>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">서비스 소개</a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">포트폴리오</a>
            <button 
              onClick={() => onNavigate && onNavigate('estimator')}
              className="px-4 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              견적 문의하기
            </button>
          </div>

          <div className="md:hidden">
            <button className="text-slate-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
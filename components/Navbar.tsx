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
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate && onNavigate('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-slate-950 font-bold text-xs tracking-tighter">MYA</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Make Your App</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate && onNavigate('home')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">포트폴리오</button>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">서비스 소개</a>
            <button 
              className="px-5 py-2 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-full transition-colors"
            >
              문의하기
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
import React from 'react';
import { Cpu, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleNav = (view: string) => {
    if (onNavigate) onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNav('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-slate-950 font-bold text-xs tracking-tighter">MYA</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Make Your App</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNav('home')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">포트폴리오</button>
            <button onClick={() => handleNav('about')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">서비스 소개</button>
            <button 
              onClick={() => handleNav('contact')}
              className="px-5 py-2 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-full transition-colors"
            >
              문의하기
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button 
              onClick={() => handleNav('home')}
              className="block w-full text-left px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              포트폴리오
            </button>
            <button 
              onClick={() => handleNav('about')}
              className="block w-full text-left px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              서비스 소개
            </button>
            <button 
              onClick={() => handleNav('contact')}
              className="block w-full text-left px-3 py-3 text-base font-medium text-brand-400 hover:text-brand-300 hover:bg-slate-800 rounded-md"
            >
              문의하기
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;